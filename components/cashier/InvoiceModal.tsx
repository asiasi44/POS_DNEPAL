"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useRef } from "react";

interface InvoiceData {
  sale: {
    id: string;
    subtotal: number;
    discount: number;
    vat: number;
    total: number;
    createdAt: string;
    items: Array<{
      id: string;
      quantity: number;
      price: number;
      total: number;
      product: {
        id: string;
        name: string;
        sku?: string;
      };
    }>;
  };
  company: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  user: {
    id: string;
    name: string;
  };
}

export default function InvoiceModal({
  isOpen,
  onClose,
  invoiceData,
}: {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: InvoiceData | null;
}) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!invoiceData) return null;

  const { sale, company, user } = invoiceData;
  const invoiceDate = new Date(sale.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    if (invoiceRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Invoice #${sale.id.slice(-8).toUpperCase()}</title>
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background: white;
                  color: #333;
                  line-height: 1.6;
                  padding: 40px;
                }
                .container {
                  max-width: 800px;
                  margin: 0 auto;
                  background: white;
                  padding: 40px;
                }
                .header {
                  display: flex;
                  justify-content: space-between;
                  align-items: start;
                  border-bottom: 3px solid #2563eb;
                  padding-bottom: 30px;
                  margin-bottom: 30px;
                }
                .invoice-title {
                  font-size: 32px;
                  font-weight: 700;
                  color: #2563eb;
                  margin-bottom: 5px;
                }
                .invoice-number {
                  font-size: 12px;
                  color: #666;
                  font-weight: 500;
                }
                .company-section {
                  text-align: right;
                }
                .company-section h3 {
                  font-size: 18px;
                  font-weight: 700;
                  margin-bottom: 8px;
                  color: #1f2937;
                }
                .company-section p {
                  font-size: 12px;
                  color: #666;
                  margin: 3px 0;
                }
                .invoice-details {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 30px;
                  padding: 20px 0;
                  border-bottom: 1px solid #e5e7eb;
                }
                .detail-block p:first-child {
                  font-weight: 600;
                  color: #374151;
                  font-size: 13px;
                  margin-bottom: 5px;
                }
                .detail-block p:last-child {
                  font-size: 14px;
                  color: #1f2937;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 30px;
                }
                thead {
                  background: #f3f4f6;
                  border-top: 2px solid #2563eb;
                  border-bottom: 2px solid #2563eb;
                }
                th {
                  padding: 15px 10px;
                  text-align: left;
                  font-weight: 600;
                  color: #1f2937;
                  font-size: 13px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                th:nth-child(2),
                td:nth-child(2),
                th:nth-child(3),
                td:nth-child(3),
                th:nth-child(4),
                td:nth-child(4) {
                  text-align: right;
                }
                tbody tr {
                  border-bottom: 1px solid #e5e7eb;
                }
                tbody tr:hover {
                  background: #f9fafb;
                }
                td {
                  padding: 12px 10px;
                  font-size: 14px;
                  color: #374151;
                }
                .totals-section {
                  display: flex;
                  justify-content: flex-end;
                  margin-bottom: 30px;
                }
                .totals-box {
                  width: 300px;
                  background: #f3f4f6;
                  border: 2px solid #2563eb;
                  border-radius: 8px;
                  padding: 20px;
                }
                .total-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 12px;
                  font-size: 14px;
                }
                .total-row.label {
                  color: #666;
                  font-weight: 500;
                }
                .total-row.discount {
                  color: #dc2626;
                }
                .total-row.final {
                  border-top: 2px solid #2563eb;
                  padding-top: 12px;
                  margin-top: 12px;
                  font-size: 16px;
                  font-weight: 700;
                  color: #2563eb;
                }
                .footer {
                  border-top: 2px solid #e5e7eb;
                  padding-top: 20px;
                  text-align: center;
                  color: #666;
                  font-size: 12px;
                }
                .footer p {
                  margin: 5px 0;
                }
                @media print {
                  body { padding: 0; }
                  .container { padding: 0; }
                }
              </style>
            </head>
            <body>
              <div class="container">
                ${invoiceRef.current.innerHTML}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 250);
      }
    }
  };



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">
          Invoice #{sale.id.slice(-8).toUpperCase()}
        </DialogTitle>

        {/* Invoice Content */}
        <div
          ref={invoiceRef}
          className="p-8 bg-white text-gray-900"
          style={{
            width: "100%",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Header */}
          <div className="border-b-2 border-gray-300 pb-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-blue-600">INVOICE</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Invoice #{sale.id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-gray-800">
                  {company.name}
                </h2>
                {company.address && (
                  <p className="text-sm text-gray-600">{company.address}</p>
                )}
                {company.phone && (
                  <p className="text-sm text-gray-600">{company.phone}</p>
                )}
                {company.email && (
                  <p className="text-sm text-gray-600">{company.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="flex justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Invoice Date:
              </p>
              <p className="text-sm text-gray-600">{invoiceDate}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Cashier:</p>
              <p className="text-sm text-gray-600">{user.name}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-100">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">
                    Item
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-700 w-16">
                    Qty
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700 w-24">
                    Unit Price
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700 w-24">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {sale.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-3 px-2 text-gray-800">{item.product.name}</td>
                    <td className="py-3 px-2 text-center text-gray-800">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-2 text-right text-gray-800">
                      Rs. {item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-right font-semibold text-gray-800">
                      Rs. {item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-semibold text-gray-800">
                  Rs. {sale.subtotal.toFixed(2)}
                </span>
              </div>

              {sale.discount > 0 && (
                <div className="flex justify-between mb-2 text-red-600">
                  <span>Discount ({sale.discount}%):</span>
                  <span className="font-semibold">
                    -Rs. {((sale.subtotal * sale.discount) / 100).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between mb-3 pb-3 border-b border-gray-200">
                <span className="text-gray-700">Amount After Discount:</span>
                <span className="font-semibold text-gray-800">
                  Rs.{" "}
                  {(sale.subtotal - (sale.subtotal * sale.discount) / 100).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-gray-700">VAT ({sale.vat}%):</span>
                <span className="font-semibold text-gray-800">
                  Rs. {((sale.subtotal - (sale.subtotal * sale.discount) / 100) * (sale.vat / 100)).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between bg-blue-50 p-2 rounded font-bold text-lg">
                <span className="text-blue-900">Total:</span>
                <span className="text-blue-600">Rs. {sale.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-300 pt-4 text-center">
            <p className="text-xs text-gray-600">
              Thank you for your purchase!
            </p>
            <p className="text-xs text-gray-600 mt-1">
              This is an electronic invoice
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-6 bg-gray-50 border-t border-gray-200">
          <Button
            onClick={handlePrint}
            className="flex items-center gap-2 flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Printer className="w-4 h-4" />
            Print Invoice
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
