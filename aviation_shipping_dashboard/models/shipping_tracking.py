# -*- coding: utf-8 -*-

from typing_extensions import Required

from numpy import require
from odoo import api, fields, models, SUPERUSER_ID, _
from datetime import datetime
from odoo.exceptions import ValidationError, UserError, Warning


class PurchaseOrder(models.Model):
      _inherit = "purchase.order"


      shipping_method_id = fields.Many2one('delivery.carrier',string = 'Shipping Method')



     
      def write(self, values):
          if values.get('shipping_method_id'):
              for r in self.picking_ids:
                  r.carrier_id = values.get('shipping_method_id')
          
          if values.get('awb'):
              for r in self.picking_ids:
                  r.carrier_tracking_ref = values.get('awb')
          

          return super(PurchaseOrder, self).write(values)
   

class StockPicking(models.Model):
      _inherit = "stock.picking"
   

  
  
      state_shiping_tracking = fields.Selection([('pending_shipment', 'Pending Shipment'), ('awaiting_pickup', 'Awaiting Pick Up'),('picked_up', 'Picked Up'), ('in_transit', 'In Transit'),
                                        ('arrived_destination', 'Arrived Destination'), ('delivered', 'Delivered'),
                                        ('return', 'Return')],string='Shipping Status',default='pending_shipment', tracking=True)

   


      type_shipment=  fields.Selection([('vendor_to_customer','Direct shipment from vendors to customers'),
                                      ('vendor_to_gfa','Shipment from Vendors to GFA'),
                                      ('gfa_to_customer','Shipment from GFA to Customers'),
                                      ('gfa_team_collect_to_customer','GFA delivery team collect the shipment and delivered to customers ')],string='Type of Delivery',required=True,default='vendor_to_customer')
                                                                                                                  

 
      @api.model
      def get_shiping_details(self):

        pending_ship_incm = self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","pending_shipment"),('drop_shipping','!=', 'yes')])
        pending_ship_out =self.env['sale.order'].search_count([("picking_ids.state_shiping_tracking","=","pending_shipment")])
        pending_ship_drop = self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","pending_shipment"),('drop_shipping','=', 'yes')])

        awaiting_pickup_incm = self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","awaiting_pickup"),('drop_shipping','!=', 'yes')])
        awaiting_pickup_out = self.env['sale.order'].search_count([("picking_ids.state_shiping_tracking","=","awaiting_pickup")])
        awaiting_pickup_drop =self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","awaiting_pickup"),('drop_shipping','=', 'yes')])

        pickedup_incm = self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","picked_up"),('drop_shipping','!=', 'yes')])
        pickedup_out = self.env['sale.order'].search_count([("picking_ids.state_shiping_tracking","=","picked_up")])
        pickedup_drop = self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","picked_up"),('drop_shipping','=', 'yes')])


        in_transit_incm = self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","in_transit"),('drop_shipping','!=', 'yes')])
        in_transit_out = self.env['sale.order'].search_count([("picking_ids.state_shiping_tracking","=","in_transit")])
        in_transit_drop = self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","in_transit"),('drop_shipping','=', 'yes')])

        arrived_dest_incm =  self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","arrived_destination"),('drop_shipping','!=', 'yes')])
        arrived_dest_out =  self.env['sale.order'].search_count([("picking_ids.state_shiping_tracking","=","arrived_destination")])
        arrived_dest_drop =self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","arrived_destination"),('drop_shipping','=', 'yes')])

        delivered_incm = self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","delivered"),('drop_shipping','!=', 'yes')])
        delivered_out = self.env['sale.order'].search_count([("picking_ids.state_shiping_tracking","=","delivered")]) 
        delivered_drop = self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","delivered"),('drop_shipping','=', 'yes')])


        return_incm = self.env['sale.order'].search_count([("picking_ids.state_shiping_tracking","=","return")])
        return_out = self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","return")]) 
        # return_drop = self.env['purchase.order'].search_count([("picking_ids.state_shiping_tracking","=","return"),('drop_shipping','=', 'yes')])
        
    
        
        res = {
      

               'pending_ship_incm':pending_ship_incm,
               'pending_ship_out':pending_ship_out,
               'pending_ship_drop':pending_ship_drop,

               'awaiting_pickup_incm':awaiting_pickup_incm,
               'awaiting_pickup_out':awaiting_pickup_out,
               'awaiting_pickup_drop':awaiting_pickup_drop,

               'pickedup_incm':pickedup_incm,
               'pickedup_out':pickedup_out,
               'pickedup_drop':pickedup_drop,

               'in_transit_incm':in_transit_incm,
               'in_transit_out':in_transit_out,
               'in_transit_drop':in_transit_drop,


               'arrived_dest_incm':arrived_dest_incm,
               'arrived_dest_out':arrived_dest_out,
               'arrived_dest_drop':arrived_dest_drop,


               'delivered_incm':delivered_incm,
               'delivered_out':delivered_out,
               'delivered_drop':delivered_drop,

               'return_incm':return_incm,
               'return_out':return_out,
            #    'return_drop':return_drop,



               }
        return res






















































           
           