INSERT INTO roles (id, name, parent, description, permissions, constraints) VALUES
(1001, 'user', NULL, 'Registered member who can interact with content.', 
    '["read:article", "read:conversation", "create:question", "create:comment", "read:portal"]'::jsonb, 
    '{"max_questions_per_day": 5, "edit_window_mins": 15}'::jsonb),

(1002, 'writer', 1001, 'Author who drafts and submits blog posts.', 
    '["create:article", "update:own_article"]'::jsonb, 
    '{"auto_publish": false, "max_drafts": 10}'::jsonb),

(1003, 'editor', 1002, 'Content manager who reviews and publishes posts.', 
    '["update:any_article", "publish:article", "delete:article"]'::jsonb, 
    '{"can_delete_published": false}'::jsonb),

(1004, 'moderator', 1001, 'Community manager for questions and conversations.', 
    '["update:any_comment", "delete:any_comment", "lock:conversation", "flag:user"]'::jsonb, 
    '{"can_ban_users": false}'::jsonb),

(1005, 'support', 1001, 'Helpdesk staff managing user account inquiries.', 
    '["read:user_profile", "update:user_password", "read:tickets"]'::jsonb, 
    '{"can_view_billing": false}'::jsonb),

(1006, 'admin', 1003, 'Day-to-day platform manager.', 
    '["update:user_role", "delete:user", "update:settings", "read:analytics"]'::jsonb, 
    '{"can_delete_owner": false}'::jsonb),

(1007, 'owner', 1006, 'Ultimate authority with full infrastructure access.', 
    '["manage:billing", "delete:platform", "bypass_all"]'::jsonb, 
    '{}'::jsonb);

SELECT setval('public.roles_id_seq', 1007, true);