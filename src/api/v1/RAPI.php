<?php
require_once 'API.php';
require_once '../services/users.php';
require_once '../services/posts.php';
require_once '../commons/log.php';


class RAPI extends API
{
    protected $userService;
    protected $postsService;

    protected $permissions = [];
    protected $user;

    public function __construct($request) {
        parent::__construct($request);

        $this->userService = new UserService();
        $this->postsService = new PostsService();

        $this->user = $this->userService->getUserByToken($this->token);
        $this->permissions = $this->userService->getPermissionsByUser($this->user);

        function setAnonymousPermissions($userService, $services) {
            $anonymousUserBean = $userService->getAnonymousUser();
            foreach($services as $service) {
                $permissions = [];

                if(method_exists($service, getAnonymousPermissions)) {
                    $permissions = $service->getAnonymousPermissions();
                }

                foreach($permissions as $permission) {
                    $userService->setPermissionToUser($permissions, $permission, $anonymousUserBean);
                }
            }
        }

//        setAnonymousPermissions($this->userService, [$this->postsService]);
    }

    protected function users($args) {
        if ($this->method == 'POST') {
            $data = $this->request;
            $id = $this->userService->createUser($this->permissions, $data['email'], $data['password'], $data['name'], $data['surname']);

            return ['id' => $id, 'email' => $data['email'], 'password' => $data['password'], 'name' => $data['name'], 'surname' => $data['surname']];
        } else {
            // TODO: verify http code
            throw new Exception('Only accepts POST requests', 405);
        }
    }

    protected function me($args) {
        if ($this->method == 'GET') {
            $userBean = $this->userService->getUserByToken($this->token);

            if($userBean != null) {
                return ['id' => $userBean->id, 'email' => $userBean->email, 'name' => $userBean->name, 'surname' => $userBean->surname];
            }
            else {
                throw new Exception('No user matching the token', 404);
            }
        } else {
            // TODO: verify http code
            throw new Exception('Only accepts GET requests', 405);
        }
    }

    protected function oauth($args) {
        if ($this->method == 'POST') {
            $data = $this->request;
            $token = $this->userService->authenticate($data['email'], $data['password']);
            return ['token' => $token];
        } else {
            // TODO: verify http code
            throw new Exception('Only accepts POST requests', 405);
        }
    }

    protected function permissions($args) {
        switch ($this->method) {
            case 'GET':
                $permissions = [];
                foreach($this->userService->getAllPermissions($this->permissions) as $permissionBean) {
                    array_push($permissions, $permissionBean->getProperties()['permission']);
                }
                return ['permissions' => $permissions];
                break;

            case 'POST':
                $data = $this->request;
                $permission = $data['permission'];
                $userId = $data['userId'];
                $userBean = $this->userService->getUserById($userId);
                $this->userService->setPermissionToUser($this->permissions, $permission, $userBean);

                $userPermissions = [];
                foreach($userBean->sharedPermissionList as $userPermissionBean) {
                    array_push($userPermissions, $userPermissionBean->getProperties()['permission']);
                }

                return ['permissions' => $userPermissions];
                break;

            default:
                // TODO: verify http code
                throw new Exception('Method ' . $this->method . ' not supported', 405);
        }
    }

    protected function posts($args) {
        switch ($this->method) {
            case 'GET':
                $data = $this->request;
                $postBeans = $this->postsService->getPosts($data['page'], $data['perPage']);
                $posts = [];
                foreach($postBeans as $postBean) {
                    $post = ['id' => $postBean->id, 'content' => $postBean->content, 'title' => $postBean->title, 'created' => $postBean->created, 'updated' => $postBean->updated];
                    array_push($posts, $post);
                }
                return ['posts' => $posts];
                break;

            case 'POST':
                $data = $this->request;
                $content = $data['content'];
                $title = $data['title'];
                $postBean = $this->postsService->createPost($this->permissions, $content, $title);
                return ['id' => $postBean->id, 'content' => $postBean->content, 'title' => $postBean->title, 'created' => $postBean->created, 'updated' => $postBean->updated];
                break;

            case 'PUT':
                $data = $this->request;
                $id = $data['id'];
                $content = $data['content'];
                $title = $data['title'];
                $postBean = $this->postsService->updatePost($this->permissions, $id, $content, $title);
                return ['id' => $postBean->id, 'content' => $postBean->content, 'title' => $postBean->title, 'created' => $postBean->created, 'updated' => $postBean->updated];
                break;

            default:
                // TODO: verify http code
                throw new Exception('Method ' . $this->method . ' not supported', 405);
        }
    }
}


try {
    $API = new RAPI($_REQUEST['request']);
    echo $API->processAPI();
} catch (Exception $e) {
    echo json_encode(Array('error' => $e->getMessage()));
}
