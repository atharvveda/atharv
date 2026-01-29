import React from 'react';

interface MedicalDisclaimerProps {
    lastReviewed: string;
    reviewerName: string;
    reviewerCredentials: string;
}

export default function MedicalDisclaimer({
    lastReviewed,
    reviewerName,
    reviewerCredentials,
}: MedicalDisclaimerProps) {
    return (
        <div
            style={{
                background: '#fff3cd',
                border: '1px solid #ffc107',
                borderRadius: '8px',
                padding: '20px',
                margin: '32px 0',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>⚕️</span>
                <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: 700 }}>
                        Medical Disclaimer
                    </h4>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        This information is for <strong>educational purposes only</strong> and does not
                        constitute medical advice, diagnosis, or treatment. Always consult a qualified
                        healthcare provider for medical concerns.
                    </p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                        <strong>Last reviewed:</strong> {lastReviewed} by {reviewerName}, {reviewerCredentials}
                    </p>
                </div>
            </div>
        </div>
    );
}
