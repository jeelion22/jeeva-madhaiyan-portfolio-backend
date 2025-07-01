const generateVisitorEmailHTML = (ip, visitDateTime, isNewVisitor) => {
  const title = isNewVisitor
    ? "🆕 New Visitor Alert"
    : "🔁 Returning Visitor Alert";
  const description = isNewVisitor
    ? `A new user has just visited your portfolio.`
    : `A returning user has accessed your portfolio again.`;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
    <h2>Hi Jeeva,</h2>
      <h2 style="color: #333;">${title}</h2>
      <p style="font-size: 16px; color: #555;">${description}</p>
      <table style="margin-top: 15px; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">IP Address:</td>
          <td style="padding: 8px;">${ip}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Visited On:</td>
          <td style="padding: 8px;">${visitDateTime}</td>
        </tr>
      </table>
    </div>
  `;
};

module.exports = { generateVisitorEmailHTML };
