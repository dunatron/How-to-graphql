<?php

namespace MyOrg\Security;

use SilverStripe\Security\Member;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;

use MyOrg\Model\Vote;
use MyOrg\Model\Event;
use MyOrg\Model\Link;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;

class AppUser extends Member implements ScaffoldingProvider
{
    private static $has_many = [
        'Events' => Event::class,
        'Links' => Link::class,
        'UsersVotes' => Vote::class,
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $eventField = GridField::create('Events')
            ->setList($this->owner->Events())
            ->setConfig(GridFieldConfig_RelationEditor::create());
        $fields->addFieldToTab('Root.Events', $eventField);

        $linksField = GridField::create('Links')
            ->setList($this->owner->Links())
            ->setConfig(GridFieldConfig_RelationEditor::create());
        $fields->addFieldToTab('Root.Links', $linksField);

        $friendField = GridField::create('Friends')
            ->setList($this->owner->Friends())
            ->setConfig(GridFieldConfig_RelationEditor::create());
        $fields->addFieldToTab('Root.Friends', $friendField);
    }

    public function canCreate($member = null, $context = array())
    {
        return true;
    }

    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        $scaffolder
            ->mutation('signinUser', __CLASS__)
            ->addArgs([
                'Email' => 'String!',
                'Password'  =>  'String!'
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info) {
                $user = self::get()->byID($args['ID']);
                if (!$user) {
                    throw new \InvalidArgumentException(sprintf(
                        'User #%s does not exist',
                        $args['ID']
                    ));
                }
                $params = [
                    'ID' => $user->ID,
                ];

                return $user;
            });

        return $scaffolder;
    }
}