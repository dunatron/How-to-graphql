<?php
namespace MyOrg\Model;

use GraphQL\Type\Definition\ResolveInfo;
use MyOrg\Security\AppUser;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\DataObject;
use SilverStripe\Security\Member;


class Link extends DataObject implements ScaffoldingProvider
{
    private static $db = [
        'Title' => 'Varchar(255)',
        'description' => 'Text',
        'url'   =>  'Text'
    ];

    private static $has_one = [
        'Owner' => AppUser::class,
    ];

    private static $has_many = [
        'VotesOnLink' => Vote::class,
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

    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        $scaffolder
            ->query('SingleLink', __CLASS__)
            ->addArgs([
                'ID' => 'ID!'
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info) {
                $link = self::get()->byID($args['ID']);
                if (!$link) {
                    throw new \InvalidArgumentException(sprintf(
                        'Link #%s does not exist',
                        $args['ID']
                    ));
                }
                $params = [
                    'ID' => $link->ID,
                ];

                return $link;
            })->setUsePagination(false)
            ->end();

        $scaffolder
            ->query('searchAllLinks', __CLASS__)
            ->addArgs([
                'filter' => 'String!',
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info) {
                $events = self::get()->filter([
                    'description:PartialMatch' => $args['filter'],
                    'url:PartialMatch' => $args['filter']
                ]);

                return $events;
            })
            ->setUsePagination(false)
            ->end();
         $scaffolder
            ->query('LinkSub', __CLASS__)
            ->addArgs([
                'channel' => 'String!',
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info) {
                $options = array(
                    'cluster' => 'ap1',
                    'encrypted' => true
                );
                //$pusher = new Pusher\Pusher(
                //    'd5536e8c56406780f1c0',
                 //   '172a22a7a9f13384a14d',
               //     '501918',
               //     $options
               // );

               // $data['message'] = 'hello world';
                 $events = self::get();

                //$pusher->trigger('my-channel', 'my-event', $data);
                return $events;
            })
            ->setUsePagination(false)
            ->end();

        return $scaffolder;
    }


}
