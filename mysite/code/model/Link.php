<?php
namespace MyOrg\Model;

use SilverStripe\ORM\DataObject;
use SilverStripe\Assets\Image;
use SilverStripe\Security\Member;


class Link extends DataObject
{
    private static $db = [
        'Title' => 'Varchar(255)',
        'description' => 'Text',
        'url'   =>  'Text'
    ];

    private static $has_one = [
        'Owner' => Member::class,
    ];

    private static $default_sort = 'Created DESC';

    public function canView($member = null)
    {
        return true;
    }
}