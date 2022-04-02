odoo.define('aviation_shipping_dashboard.AviationCommonDashboard', function (require) {
    "use strict";

    var AbstractAction = require('web.AbstractAction');
    var ajax = require('web.ajax');
    var core = require('web.core');
    var rpc = require('web.rpc');
    var session = require('web.session');
    var web_client = require('web.web_client');
    var _t = core._t;
    var QWeb = core.qweb;

    var AviationShippingDashboard = AbstractAction.extend({
        template: 'AviationShippingDashboard',
        events: {
            // Sales Options
            'click .open_pending_ship_incm': 'open_pending_ship_incm',
            'click .open_pending_ship_out': 'open_pending_ship_out',
            'click .open_pending_ship_drop': 'open_pending_ship_drop',

            'click .open_awaiting_pickup_incm': 'open_awaiting_pickup_incm',
            'click .open_awaiting_pickup_out': 'open_awaiting_pickup_out',
            'click .open_awaiting_pickup_drop': 'open_awaiting_pickup_drop',


            'click .open_pickedup_incm': 'open_pickedup_incm',
            'click .open_pickedup_out': 'open_pickedup_out',
            'click .open_pickedup_drop': 'open_pickedup_drop',

            'click .open_in_transit_incm': 'open_in_transit_incm',
            'click .open_in_transit_out': 'open_in_transit_out',
            'click .open_in_transit_drop': 'open_in_transit_drop',

            'click .open_arrivred_dest_incm': 'open_arrivred_dest_incm',
            'click .open_arrivred_dest_out': 'open_arrivred_dest_out',
            'click .open_arrivred_dest_drop': 'open_arrivred_dest_drop',

            'click .open_delivered_incm': 'open_delivered_incm',
            'click .open_delivered_out': 'open_delivered_out',
            'click .open_delivered_drop': 'open_delivered_drop',

            'click .open_return_incm': 'open_return_incm',
            'click .open_return_out': 'open_return_out',
            'click .open_return_drop': 'open_return_drop',


        },
        init: function (parent, context) {
            this._super(parent, context);
            // Sales fields
            this.so_lead = ''; this.so_quotation = ''; this.so_sent = ''; this.so_po_tender = ''; this.so_po_tender_confirmed = '';
            this.so_sales = ''; this.so_cancel = ''; this.so_to_invoice = '';

            this.pending_ship_incm = '';
            this.pending_ship_out = '';
            this.pending_ship_drop = '';

            this.awaiting_pickup_incm = '';
            this.awaiting_pickup_out = '';
            this.awaiting_pickup_drop = '';

            this.pickedup_incm = '';
            this.pickedup_out = '';
            this.pickedup_drop = '';

            this.in_transit_incm = '';
            this.in_transit_out = '';
            this.in_transit_drop = '';

            this.arrived_dest_incm = '';
            this.arrived_dest_out = '';
            this.arrived_dest_drop = '';

            this.delivered_incm = '';
            this.delivered_out = '';
            this.delivered_drop = '';

            this.return_incm = '';
            this.return_out = '';
            this.return_drop = '';




        },
        start: function () {
            var self = this;
            self.lead = 4;
            this.set("title", 'Dashboard');
            this._rpc({
                model: 'stock.picking',
                method: 'get_shiping_details',
                args: [],
            }).then(function (result) {
                // Dashboard fields
                self.so_lead = result['lead']; self.so_quotation = result['quotation'];

                self.pending_ship_incm = result['pending_ship_incm'];
                self.pending_ship_out = result['pending_ship_out'];
                self.pending_ship_drop = result['pending_ship_drop'];

                self.awaiting_pickup_incm = result['awaiting_pickup_incm'];
                self.awaiting_pickup_out = result['awaiting_pickup_out'];
                self.awaiting_pickup_drop = result['awaiting_pickup_drop'];

                self.pickedup_incm = result['pickedup_incm'];
                self.pickedup_out = result['pickedup_out'];
                self.pickedup_drop = result['pickedup_drop'];

                self.in_transit_incm = result['in_transit_incm'];
                self.in_transit_out = result['in_transit_out'];
                self.in_transit_drop = result['in_transit_drop'];

                self.arrived_dest_incm = result['arrived_dest_incm'];
                self.arrived_dest_out = result['arrived_dest_out'];
                self.arrived_dest_drop = result['arrived_dest_drop'];

                self.delivered_incm = result['delivered_incm'];
                self.delivered_out = result['delivered_out'];
                self.delivered_drop = result['delivered_drop'];

                self.return_incm = result['return_incm'];
                self.return_out = result['return_out'];
                self.return_drop = result['return_drop'];




                self.$el.empty();



                self.$el.append(QWeb.render('AviationShippingDashboard', { widget: self }))
            });

        },
        // Pending Shipment
        open_pending_ship_incm: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Pending Shipment Incoming"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "pending_shipment"], ['drop_shipping', '!=', 'yes']],
                target: 'current'
            }, options)
        },
        open_pending_ship_out: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Pending Shipment Out"),
                type: 'ir.actions.act_window',
                res_model: 'sale.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: [["picking_ids.state_shiping_tracking", "=", "pending_shipment"]],
                target: 'current'
            }, options)
        },


        open_pending_ship_drop: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Pending Shipment Drop"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "pending_shipment"], ['drop_shipping', '=', 'yes']],
                target: 'current'
            }, options)
        },

        // Awaiting pickup
        open_awaiting_pickup_incm: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Awaiting Pick Up IN"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "awaiting_pickup"], ['drop_shipping', '!=', 'yes']],
                target: 'current'
            }, options)
        },
        open_awaiting_pickup_out: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Awaiting Pick Up Out"),
                type: 'ir.actions.act_window',
                res_model: 'sale.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: [["picking_ids.state_shiping_tracking", "=", "awaiting_pickup"]],
                target: 'current'
            }, options)
        },


        open_awaiting_pickup_drop: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Awaiting Pick Up Drop"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "awaiting_pickup"], ['drop_shipping', '=', 'yes']],
                target: 'current'
            }, options)
        },


        //  Picked up
        open_pickedup_incm: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Picked Up IN"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "picked_up"], ['drop_shipping', '!=', 'yes']],
                target: 'current'
            }, options)
        },
        open_pickedup_out: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Picked Up Out"),
                type: 'ir.actions.act_window',
                res_model: 'sale.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: [["picking_ids.state_shiping_tracking", "=", "picked_up"]],
                target: 'current'
            }, options)
        },

        open_pickedup_drop: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Picked Up Drop"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "picked_up"], ['drop_shipping', '=', 'yes']],
                target: 'current'
            }, options)
        },


        //  In Transit
        open_in_transit_incm: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Transit IN"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "in_transit"], ['drop_shipping', '!=', 'yes']],
                target: 'current'
            }, options)
        },
        open_in_transit_out: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Transit Out"),
                type: 'ir.actions.act_window',
                res_model: 'sale.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: [["picking_ids.state_shiping_tracking", "=", "in_transit"]],
                target: 'current'
            }, options)
        },

        open_in_transit_drop: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Transit Drop"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "in_transit"], ['drop_shipping', '=', 'yes']],
                target: 'current'
            }, options)
        },


        //  Arrived Destination

        open_arrivred_dest_incm: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Arrived Destination IN"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "arrived_destination"], ['drop_shipping', '!=', 'yes']],
                target: 'current'
            }, options)
        },
        open_arrivred_dest_out: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Arrived Destination Out"),
                type: 'ir.actions.act_window',
                res_model: 'sale.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: [["picking_ids.state_shiping_tracking", "=", "arrived_destination"]],
                target: 'current'
            }, options)
        },

        open_arrivred_dest_drop: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Arrived Destination Drop"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "arrived_destination"], ['drop_shipping', '=', 'yes']],
                target: 'current'
            }, options)
        },



        //  Delivered

        open_delivered_incm: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Delivered IN"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "delivered"], ['drop_shipping', '!=', 'yes']],
                target: 'current'
            }, options)
        },
        open_delivered_out: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Delivered Out"),
                type: 'ir.actions.act_window',
                res_model: 'sale.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: [["picking_ids.state_shiping_tracking", "=", "delivered"]],
                target: 'current'
            }, options)
        },

        open_delivered_drop: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Delivered Drop"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: ['&', ["picking_ids.state_shiping_tracking", "=", "delivered"], ['drop_shipping', '=', 'yes']],
                target: 'current'
            }, options)
        },


        //  Return

        open_return_incm: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Return IN"),
                type: 'ir.actions.act_window',
                res_model: 'sale.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: [["picking_ids.state_shiping_tracking", "=", "return"]],
                target: 'current'
            }, options)
        },
        open_return_out: function (e) {
            var self = this;
            e.stopPropagation();
            e.preventDefault();
            var options = {
                on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            };
            this.do_action({
                name: _t("Return Out"),
                type: 'ir.actions.act_window',
                res_model: 'purchase.order',
                view_mode: 'tree,form',
                views: [[false, 'list'], [false, 'form']],
                domain: [["picking_ids.state_shiping_tracking", "=", "return"]],
                target: 'current'
            }, options)
        },


        // open_return_drop: function (e) {
            // var self = this;
            // e.stopPropagation();
            // e.preventDefault();
            // var options = {
                // on_reverse_breadcrumb: this.on_reverse_breadcrumb,
            // };
            // this.do_action({
                // name: _t("Return Drop"),
                // type: 'ir.actions.act_window',
                // res_model: 'purchase.order',
                // view_mode: 'tree,form',
                // views: [[false, 'list'], [false, 'form']],
                // domain: ['&', ["picking_ids.state_shiping_tracking", "=", "return"], ['drop_shipping', '=', 'yes']],
                // target: 'current'
            // }, options)
        // },







    });
    core.action_registry.add('aviation_shipping_dashboard', AviationShippingDashboard);
});