{
    'name': 'Static Favicon',
    'version': '1.0',
    'category': 'Website',
    'summary': 'Replace default Odoo favicon with a custom one',
    'description': """
        This module replaces the default Odoo favicon with a custom one.
        The favicon is statically included and applies to both frontend and backend.
    """,
    'author': 'Hotcodes',
    'website': 'https://www.hotcodes.io',
    'depends': ['web'],
    'data': [
        'views/assets.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
}