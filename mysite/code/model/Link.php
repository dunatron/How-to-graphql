<?php
namespace MyOrg\Model;

use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
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

    /**
     * @param Member $member
     * @param array $context Additional context-specific data which might
     * affect whether (or where) this object could be created.
     * @return boolean
     */
    public function canCreate($member = null, $context = array())
    {
//        $extended = $this->extendedCan(__FUNCTION__, $member, $context);
//        if ($extended !== null) {
//            return $extended;
//        }
//        return Permission::check('ADMIN', 'any', $member);
        return true;
    }


}