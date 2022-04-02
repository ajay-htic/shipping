# -*- coding: utf-8 -*-
{
    'name': "Aviation: Shipping Dashboard ",
    'version': "13.0.0.1",
    'sequence': -40,
    'category': "Aviation",
    'summary': 'This apps will add Shipping Dashboard.',
    'description': """ This apps will add Shipping Dashboard """,
    'author': "Ajay Rakholiya",
    'depends': ['base',
                'stock','sale','purchase'],
    'data': [
        # Dashboard
        'views/shipping_assets.xml',
        'views/inherited_stock_picking_view.xml',
    ],
    'qweb': [
        "static/src/xml/aviation_shipping_dashboard.xml",
             ],
    'installable': True,
    'auto_install': False,
    'application': True,
}
