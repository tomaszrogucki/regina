<?php
require_once '../commons/beans.php';


class UserService {

    // Public
    public function getUserById($id) {
        return R::load('user', $id);
    }

    public function setUser($user) {
        return R::store($user);
    }

    public function createUser($permissions, $email, $password, $name = null, $surname = null) {
        if(in_array(Permissions::WRITE_USER, $permissions)) {
            $userBean = R::dispense('user');
            $userBean->email = $email;
            $userBean->password = $password;
            $userBean->name = $name;
            $userBean->surname = $surname;

            try {
                $id = R::store($userBean);
            }
            catch(RedBeanPHP\RedException\SQL $e) {
                if($e->getSQLState() == 23000) {
                    throw new Exception('User with ' . $email . ' email address already exists', 409);
                }
            }

            // TODO: return the whole object?
            return $id;
        }
        else {
            throw new Exception('Not authorized to create a user', 401);
        }
    }

    public function getUserByEmail($email) {
        $userBean = R::findOne('user', 'email = ?', [$email]);
        return $userBean;
    }



    public function getTokenByUser($userBean) {
        $tokens = $userBean->ownTokenList;
        $lastToken = end($tokens);
        return $lastToken;
    }

    public function getUserByToken($token) {
        $tokenBean = R::findOne('token', 'token = ?', [$token]);
        return $tokenBean->user;
    }

    public function authenticate($email, $password) {
        $userBean = R::findOne('user', 'email = ? AND password = ?', [$email, $password]);

        if($userBean == null) {
            throw new Exception('Invalid username or password', 404);
        }

        $token = $this->getTokenByUser($userBean);

        if($token == null) {
            // TODO: check what happens if token is unique and we try to save 2x the same value
            $token = R::dispense('token');
            $token->token = $this->generateToken($userBean);
            $userBean->ownTokenList[] = $token;
            R::store($userBean);
        }

        return $token->token;
    }



    public function getAllPermissions($permissions) {
        if(in_array(Permissions::READ_PERMISSION, $permissions)) {
            $permissions = R::findAll('permission');
            return $permissions;
        }
        else {
            throw new Exception('Not authorized to read permissions', 401);
        }
    }

    public function getPermissionsByUser($userBean) {
        if($userBean != null) {
            return array_map(array($this, 'getPermissionName'), $userBean->sharedPermissionList);
        }
        else {
            return [];
        }
    }

    public function setPermissionToUser($permissions, $permission, $userBean) {
        if(in_array(Permissions::WRITE_PERMISSION, $permissions)) {
            $permissionBean = R::findOne('permission', 'permission = ?', [$permission]);

            if($permissionBean == null) {
                $permissionBean = R::dispense('permission');
                $permissionBean->permission = $permission;
                R::store($permissionBean);
            }

            if($userBean != null) {
                $userBean->sharedPermissionList[] = $permissionBean;
                R::store($userBean);
            }

            // TODO: return boolean?
        }
        else {
            throw new Exception('Not authorized to set a permission', 401);
        }
    }



    public function getAnonymousUser() {
        return $this->getUserByToken('');
    }

    public function isAnonymousUser($userBean) {
        return end($userBean->ownTokenList)->token == '';
    }


    // Private
    private function generateToken($user = null) {
        return md5(strval(mt_rand()));
    }

    private function getPermissionName($permissionBean) {
        return $permissionBean->permission;
    }
}