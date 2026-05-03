/**
 * Opens print dialog with same invoice layout as seller Orders panel.
 * @param {object} order — order document (items with populated product)
 */
export function printOrderInvoice(order) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const itemsHtml = (order.items || [])
    .map((item) => {
      const price = item.product?.offerPrice || item.product?.price || item.price || 0;
      const total = price * item.quantity;

      return `
      <tr>
        <td>${item.product?.name || "Deleted Product"}</td>
        <td style="text-align:center;">${item.quantity}</td>
        <td style="text-align:right;">₹${price}</td>
        <td style="text-align:right;">₹${total}</td>
      </tr>
    `;
    })
    .join("");

  const deliveryCharge = order.deliveryCharge || 0;
  const discount = order.discount || 0;
  const rewardUsed = order.rewardPointsUsed || 0;
  const subtotal =
    order.subtotal != null && order.subtotal !== undefined
      ? order.subtotal
      : Math.max(0, order.amount + rewardUsed - deliveryCharge + discount);
  const pointsEarned = Math.floor(Number(order.amount) / 50);
  const idStr = String(order._id || "");

  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 15px;
            color: #333;
            font-size: 12px;
          }

          .container {
            border: 1px solid #ddd;
            padding: 15px;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          }

          .brand {
            font-size: 18px;
            font-weight: bold;
            color: #16a34a;
          }

          .invoice-title {
            font-size: 14px;
            font-weight: bold;
          }

          .section {
            margin-top: 10px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
          }

          th {
            background: #f3f4f6;
            padding: 6px;
            font-size: 12px;
            text-align: left;
          }

          td {
            padding: 5px;
            border-bottom: 1px solid #eee;
            font-size: 12px;
          }

          .summary {
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
          }

          .summary-box {
            width: 220px;
          }

          .summary-box p {
            display: flex;
            justify-content: space-between;
            margin: 4px 0;
          }

          .total {
            font-weight: bold;
            border-top: 1px solid #000;
            padding-top: 4px;
            font-size: 14px;
          }

          .footer {
            margin-top: 15px;
            text-align: center;
            font-size: 11px;
            color: #777;
          }

          @media print {
            body { margin: 0; }
          }
        </style>
      </head>

      <body>

        <div class="container">

          <div class="header">
            <div class="brand">DesiBazar</div>
            <div class="invoice-title">INVOICE</div>
          </div>

          <div>
            <strong>Order id:</strong> #${idStr.slice(-6)} |
            <strong>Date:</strong> ${new Date(order.createdAt).toLocaleString("en-IN")}
          </div>

        <div class="section">
  <strong>Customer Details:</strong><br/>
  ${order.address?.firstName || ""} ${order.address?.lastName || ""},<br/>
  ${order.address?.street || ""}, ${order.address?.city || ""}<br/>
  Phone: ${order.address?.phone || ""}
</div>

          <div class="section">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th style="text-align:center;">Qty</th>
                  <th style="text-align:right;">Price</th>
                  <th style="text-align:right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <div class="summary">
            <div class="summary-box">
              <p><span>Subtotal</span><span>₹${subtotal}</span></p>
              <p><span>Discount</span><span>- ₹${discount}</span></p>
              <p><span>Delivery</span><span>${deliveryCharge === 0 ? "Free" : "₹" + deliveryCharge}</span></p>
              ${rewardUsed > 0 ? `<p><span>Reward points redeemed</span><span>− ₹${rewardUsed}</span></p>` : ""}
              <p class="total"><span>Total payable</span><span>₹${order.amount}</span></p>
              ${pointsEarned > 0 ? `<p style="font-size:11px;color:#666;margin-top:6px;"><span>Reward points earned</span><span>${pointsEarned} pts</span></p>` : ""}
            </div>
          </div>

          <div class="section">
            <strong>Payment:</strong> ${order.paymentType}
          </div>

          <div class="footer">
            Thank you for shopping with DesiBazar ❤️
          </div>

        </div>

      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
}
