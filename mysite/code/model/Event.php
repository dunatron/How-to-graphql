<?php
namespace MyOrg\Model;

use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\DataObject;
use SilverStripe\Assets\Image;
use SilverStripe\Security\Member;


class Event extends DataObject implements ScaffoldingProvider
{
    private static $db = [
        'Title' => 'Varchar(255)',
        'BgColor' => 'TractorCow\Colorpicker\Color'
    ];

    private static $has_one = [
        'Owner' => Member::class,
        'Image' => Image::class,
        'Category' => Category::class
    ];

    private static $default_sort = 'Created DESC';

    public function getThumbnail()
    {
        return $this->Image()->exists() ? $this->Image()->Fill(300, 300)->AbsoluteURL : null;
    }

    public function canView($member = null)
    {
        return true;
    }

    public function onAfterWrite()
    {
        parent::onAfterWrite();

        if ($this->Image()->exists()) {
            $this->Image()->copyVersionToStage('Stage', 'Live');
        }
    }


    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        $scaffolder
            ->query('SingleEvent', __CLASS__)
            ->addArgs([
                'ID' => 'ID!'
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info) {
                $event = self::get()->byID($args['ID']);
                if (!$event) {
                    throw new \InvalidArgumentException(sprintf(
                        'User #%s does not exist',
                        $args['ID']
                    ));
                }
                $params = [
                    'ID' => $event->ID,
                ];

                return $event;
            })->setUsePagination(false)
            ->end();

        return $scaffolder;
    }
}