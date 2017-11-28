<?php
namespace MyOrg\Controller;
use MyOrg\Model\Link;
use SilverStripe\Admin\ModelAdmin;
class LinkAdmin extends ModelAdmin
{
    private static $managed_models = [
        Link::class,
    ];
    private static $url_segment = 'links-admin';
    private static $menu_title = 'Links';
}