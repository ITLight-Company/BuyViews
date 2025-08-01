'use client'

import { useState, useEffect } from 'react'
import { Calculator, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CustomPackage } from '@/types'
import { formatNumber } from '@/lib/utils'
import { MINIMUM_CUSTOM_VIEWS, MAXIMUM_CUSTOM_VIEWS, PRICE_PER_1000_VIEWS } from '@/lib/packages'

interface CustomPackageBuilderProps {
    onPackageCreate: (pkg: CustomPackage) => void
    selectedCustomPackage?: CustomPackage
}

export function CustomPackageBuilder({ onPackageCreate, selectedCustomPackage }: CustomPackageBuilderProps) {
    const [views, setViews] = useState(selectedCustomPackage?.views || MINIMUM_CUSTOM_VIEWS)
    const [price, setPrice] = useState(selectedCustomPackage?.price || 0)

    // Calculate price based on views
    useEffect(() => {
        // Minimum price is proportional to views (not fixed at 5.99)
        const calculatedPrice = (views / 1000) * PRICE_PER_1000_VIEWS
        // But never less than $2.99 for minimum 500 views
        const finalPrice = Math.max(calculatedPrice, 2.99)
        setPrice(Math.round(finalPrice * 100) / 100)

        // Update slider background
        const progress = ((views - MINIMUM_CUSTOM_VIEWS) / (MAXIMUM_CUSTOM_VIEWS - MINIMUM_CUSTOM_VIEWS)) * 100
        const sliderEl = document.querySelector('.custom-range-slider') as HTMLInputElement
        if (sliderEl) {
            sliderEl.style.background = `linear-gradient(to right, var(--primary-blue) 0%, var(--primary-blue) ${progress}%, #e2e8f0 ${progress}%, #e2e8f0 100%)`
        }
    }, [views])

    const handleViewsChange = (newValues: number[]) => {
        const newViews = newValues[0]
        console.log('Views changed to:', newViews) // Debug log
        setViews(newViews)

        // Update slider background for HTML range input
        const progress = ((newViews - MINIMUM_CUSTOM_VIEWS) / (MAXIMUM_CUSTOM_VIEWS - MINIMUM_CUSTOM_VIEWS)) * 100
        const sliderEl = document.querySelector('.custom-range-slider') as HTMLInputElement
        if (sliderEl) {
            sliderEl.style.background = `linear-gradient(to right, var(--primary-blue) 0%, var(--primary-blue) ${progress}%, #e2e8f0 ${progress}%, #e2e8f0 100%)`
        }
    }

    const handleCreatePackage = () => {
        const customPackage: CustomPackage = {
            views,
            price
        }
        onPackageCreate(customPackage)
    }

    const isSelected = selectedCustomPackage !== undefined

    return (
        <div className={`package-card custom-package-card ${isSelected ? 'selected' : ''}`}>
            {/* Custom Package Badge */}
            <div className="package-badge" style={{ display: 'block', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                <Settings size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Custom
            </div>

            <div className="package-card-header">
                <h3 className="package-name">Custom Package</h3>
                <div className="package-views">{formatNumber(views)}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    views
                </div>
                <div className="package-price">
                    <span className="currency">$</span>{price}
                </div>
            </div>

            <div className="package-content">
                <div className="custom-slider-section">
                    <div className="views-header" style={{ marginBottom: '12px' }}>
                        <label className="views-label" style={{ fontSize: '14px', fontWeight: '600' }}>
                            Adjust Views: {formatNumber(views)}
                        </label>
                    </div>

                    <div className="views-slider" style={{
                        marginBottom: '8px',
                        padding: '10px 0',
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <input
                            type="range"
                            value={views}
                            onChange={(e) => handleViewsChange([parseInt(e.target.value)])}
                            max={MAXIMUM_CUSTOM_VIEWS}
                            min={MINIMUM_CUSTOM_VIEWS}
                            step={100}
                            style={{
                                width: '100%',
                                height: '8px',
                                background: 'linear-gradient(to right, #3b82f6 0%, #3b82f6 50%, #e2e8f0 50%, #e2e8f0 100%)',
                                outline: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                            className="custom-range-slider"
                        />
                    </div>

                    <div className="views-range" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        color: 'var(--text-secondary)',
                        marginBottom: '16px'
                    }}>
                        <span>{formatNumber(MINIMUM_CUSTOM_VIEWS)} min</span>
                        <span>{formatNumber(MAXIMUM_CUSTOM_VIEWS)} max</span>
                    </div>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    ${PRICE_PER_1000_VIEWS} per 1,000 views
                </div>
            </div>

            <div className="package-footer">
                <Button
                    onClick={handleCreatePackage}
                    className={`btn ${isSelected ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ width: '100%' }}
                >
                    <Calculator size={16} style={{ marginRight: '8px' }} />
                    {isSelected ? 'Selected' : 'Calculate & Select'}
                </Button>
            </div>
        </div>
    )
}
