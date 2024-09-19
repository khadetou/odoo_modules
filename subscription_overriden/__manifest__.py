{
    "name": "Subscription Overriden",
    "version": "1.0",
    "author": "IT-Projects LLC, Ivan Yelizariev",
    "category": "Hidden",
    "description": """Code""",
    "depends": ["web_enterprise",
                'web',
        'web_enterprise',
        'knowledge',  # Add this if you're using the Knowledge module
        'web_cohort',  ],
    "data": [],
    "assets": {
        "web.assets_backend": ["subscription_overriden/static/src/webclient/**/*.js",],
    },
    "installable": True,
    "auto_install": True,
}
