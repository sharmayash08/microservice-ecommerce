'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { v4: uuidv4 } = require('uuid'); // Import uuid for generating unique orderId
const nodemailer = require('nodemailer'); // Import Nodemailer

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  // Override the default create method to include orderId generation and email sending
  async create(ctx) {
    const { data } = ctx.request.body;

    if (!data) {
      return ctx.badRequest('No data provided');
    }

    // Generate a unique orderId for the order
    data.orderId = uuidv4(); // Generate a unique order ID

    // Validate if the necessary fields are provided
    if (!data.cartItems || data.cartItems.length === 0) {
      return ctx.badRequest('Cart items are required');
    }

    if (!data.shippingAddress || !data.shippingAddress.name || !data.shippingAddress.address) {
      return ctx.badRequest('Shipping address is incomplete');
    }

    // Save the order to the database
    try {
      const response = await strapi.services['api::order.order'].create({ data });

      // Return the response after creating the order and sending the email
      return response;
    } catch (error) {
      console.error('Error creating the order or sending the email:', error);
      return ctx.internalServerError('Error creating the order or sending the email');
    }
  },
}));
