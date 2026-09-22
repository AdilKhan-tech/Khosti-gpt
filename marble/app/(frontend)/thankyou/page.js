"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "your order";

  return (
    <main className="thank-you-page d-flex align-items-center justify-content-center">
      <section className="thank-you-card text-center bg-white rounded-5 shadow-sm p-5">
        <div className="thank-you-icon mx-auto mb-4">
          <i className="bi bi-check-lg"></i>
        </div>
        <span className="text-uppercase small fw-bold text-secondary">
          Marble Store
        </span>
        <h1 className="fw-bold mt-2 mb-3">Thank you for your order!</h1>
        <p className="text-secondary mb-2">
          Your order has been received and is being prepared.
        </p>
        <p className="fw-semibold mb-4">Order number: {orderNumber}</p>
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <Link href="/" className="btn thank-you-primary rounded-pill px-4">
            Continue shopping
          </Link>
          <Link
            href="/myAccount"
            className="btn btn-outline-secondary rounded-pill px-4"
          >
            My account
          </Link>
        </div>
      </section>
      <style jsx>{`
        .thank-you-page {
          min-height: calc(100vh - 134px);
          margin-top: 134px;
          padding: 32px 16px;
          background: #f7f8fa;
        }
        .thank-you-card {
          width: min(560px, 100%);
        }
        .thank-you-icon {
          display: grid;
          width: 76px;
          height: 76px;
          place-items: center;
          border-radius: 50%;
          background: #36bac7;
          color: #fff;
          font-size: 38px;
        }
        .thank-you-primary {
          background: #36bac7;
          color: #fff;
        }
        .thank-you-primary:hover {
          background: #2ba3b3;
          color: #fff;
        }
      `}</style>
    </main>
  );
}
