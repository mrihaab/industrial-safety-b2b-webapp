import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/utils/formatters';

export const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();
  const navigate = useNavigate();

  const breadcrumbItems = [{ label: 'Wholesale Quote Cart' }];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getImageUrl = (url?: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const backendBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1').replace('/api/v1', '');
    return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return (
    <div className="space-y-10">
      <Breadcrumb items={breadcrumbItems} />

      <SectionHeader
        badge="WHOLESALE ORDER CART"
        title="Your Selected Safety Gear Cart"
        subtitle="Review your selected items, size selections, and quantities before submitting for a formal bulk quotation."
      />

      {cartItems.length === 0 ? (
        <div className="max-w-xl mx-auto bg-surface-container industrial-border p-12 text-center rounded-sm space-y-6">
          <span className="material-symbols-outlined text-primary text-6xl">shopping_cart</span>
          <h3 className="font-headline-lg text-2xl text-on-surface font-extrabold">Your Cart is Empty</h3>
          <p className="font-body-sm text-on-surface-variant max-w-sm mx-auto">
            You haven't added any industrial safety items to your quote cart yet. Explore our wholesale catalog to request quotes.
          </p>
          <div className="pt-2">
            <Link to="/products">
              <Button variant="primary" size="lg">
                Explore Catalog & Add Items
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="hidden sm:flex justify-between items-center bg-surface-container-high px-6 py-4 border border-outline-variant rounded-sm font-label-caps text-xs text-primary uppercase">
              <span>Product & Selected Size</span>
              <span>MOQ / Quantity</span>
              <span>Subtotal</span>
            </div>

            <div className="space-y-3">
              {cartItems.map((item, idx) => (
                <div
                  key={`${item.productId}-${idx}`}
                  className="bg-surface-container border border-outline-variant p-5 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-4 truncate flex-1">
                    <img
                      src={getImageUrl(item.imageUrl)}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-xs border border-outline-variant/60 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="truncate space-y-1">
                      <Link to={`/products/${item.slug || 'gsh-elite-industrial-gloves'}`} className="font-bold text-on-surface hover:text-primary transition-colors text-base block truncate">
                        {item.title}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="bg-surface-container-high border border-outline-variant px-2 py-0.5 font-mono text-primary font-bold">
                          Size: {item.sizeRange || 'L'}
                        </span>
                        <span>Unit: {formatPrice(item.price)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant/40">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-outline-variant bg-surface-container-low rounded-xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, Math.max(50, item.quantity - 50))}
                        className="px-3.5 py-2.5 min-h-[44px] min-w-[44px] text-on-surface-variant hover:text-primary transition-colors font-mono font-bold flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 py-2 font-mono text-xs font-bold text-on-surface min-w-[50px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 50)}
                        className="px-3.5 py-2.5 min-h-[44px] min-w-[44px] text-on-surface-variant hover:text-primary transition-colors font-mono font-bold flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-extrabold text-primary text-base block">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        className="text-[11px] text-error hover:underline font-mono"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-label-caps text-on-surface-variant hover:text-error underline"
              >
                Clear Cart ({totalItems} items)
              </button>
              <Link to="/products" className="text-xs font-label-caps text-primary hover:underline">
                ← Continue Browsing Catalog
              </Link>
            </div>
          </div>

          {/* Cart Summary & RFQ Action Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container border border-outline-variant p-6 rounded-sm space-y-6">
              <h3 className="font-title-md text-xl text-on-surface font-bold border-b border-outline-variant pb-4">
                Quote Estimation Summary
              </h3>

              <div className="space-y-3 font-body-sm text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Total Selected Line Items:</span>
                  <span className="font-mono text-on-surface font-bold">{cartItems.length}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Total Unit Volume:</span>
                  <span className="font-mono text-on-surface font-bold">{totalItems} units</span>
                </div>
                <div className="border-t border-outline-variant/60 pt-3 flex justify-between text-on-surface font-bold text-lg">
                  <span>Estimated Total:</span>
                  <span className="font-mono text-primary font-extrabold">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                * Note: Final bulk pricing and freight discount schedules will be generated upon submitting your formal Bulk RFQ Inquiry.
              </p>

              <Button
                variant="primary"
                size="lg"
                className="w-full orange-glow uppercase font-bold"
                onClick={() => navigate('/rfq')}
              >
                Proceed to Bulk RFQ Inquiry →
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
