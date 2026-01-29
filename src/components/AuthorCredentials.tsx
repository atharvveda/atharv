import React from 'react';

interface AuthorCredentialsProps {
    name: string;
    credentials: string;
    imageUrl?: string;
    bio?: string;
}

export default function AuthorCredentials({
    name,
    credentials,
    imageUrl,
    bio,
}: AuthorCredentialsProps) {
    return (
        <div
            style={{
                background: '#f8f9fa',
                borderRadius: '12px',
                padding: '24px',
                margin: '32px 0',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
            }}
        >
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={name}
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
            )}
            <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 700 }}>
                    {name}
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#666' }}>
                    {credentials}
                </p>
                {bio && (
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {bio}
                    </p>
                )}
            </div>
        </div>
    );
}
