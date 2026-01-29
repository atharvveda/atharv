"use client";

import React from "react";

export default function PrintReceiptButton() {
    return (
        <button
            className="btn btn-secondary"
            onClick={() => window.print()}
        >
            Print Receipt
        </button>
    );
}
