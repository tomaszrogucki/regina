<?php
require_once '../commons/beans.php';
require_once '../commons/permissions.php';

class PostsService {

    // Public
    public function createPost($permissions, $content, $title = null) {
        if(in_array(Permissions::WRITE_POST, $permissions)) {
            $postBean = R::dispense('post');
            $postBean->content = $content;
            $postBean->title = $title;
            $postBean->created = gmdate("Y-m-d H:i:s");
            $postBean->updated = gmdate("Y-m-d H:i:s");
            R::store($postBean);
            return $postBean;
        }
        else {
            throw new Exception('Not authorized to create a post', 401);
        }
    }

    public function updatePost($permissions, $id, $content, $title = null) {
        if(in_array(Permissions::WRITE_POST, $permissions)) {
            $postBean = R::load('post', $id);
            $postBean->content = $content;
            $postBean->title = $title;
            $postBean->updated = gmdate("Y-m-d H:i:s");
            R::store($postBean);
            return $postBean;
        }
        else {
            throw new Exception('Not authorized to update a post', 401);
        }
    }

    public function getPosts($page = null, $perPage = 10) {
        $limit = $page == null ? '18446744073709551610' : $perPage;
        $offset = $page == null ? 0 : ($page-1) * $perPage;

        return R::findAll('post', 'ORDER BY created DESC LIMIT ' . $limit . ' OFFSET ' . $offset);
    }

    public function getPostById($id) {
        return R::load('post', $id);
    }

    public function getMetadata() {
        $total = R::count('post');

        // TODO: this is a very bad temporary implementation, improve it!
        $postBeans = R::findAll('post');
        $titles = [];
        $tmpTitleIds = [];

        foreach($postBeans as $postBean) {
            array_push($titles, $postBean->title);
            array_push($tmpTitleIds, $postBean->id);
        }

        return ['total' => $total, 'titles' => $titles, 'tmpTitleIds' => $tmpTitleIds];
    }

    public function createTag($tag) {
        $tagBean = R::dispense('tag');
        $tagBean->tag = $tag;

        try {
            $id = R::store($tagBean);
        }
        catch(RedBeanPHP\RedException\SQL $e) {
            if($e->getSQLState() == 23000) {
                throw new Exception('Tag ' . $tag . ' already exists', 409);
            }
        }

        return $id;
    }

    public function getAnonymousPermissions() {
        return [Permissions::READ_POST];
    }
}