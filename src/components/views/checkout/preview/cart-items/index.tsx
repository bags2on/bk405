import { CartItem, type CartItemType } from '@/components/cart-item'
import { Button } from '@/components/ui/button'
import { ListSkeleton } from '@/components/layout/cart/list-skeleton' // TODO: make shared
import { normalizedView, useCartStore } from '@/store/cart'
import { useRouter } from 'next/router'
import { routeNames } from '@/lib/navigation'
import { clearCart } from '@/apollo/cache/cart'

import styles from './styles.module.scss'

interface CartItemsProps {
  loading: boolean
  cartProducts: CartItemType[]
}

export function CartItems({ loading, cartProducts }: CartItemsProps) {
  const router = useRouter()

  const cartItems = useCartStore((state) => state.cartItems)
  const itemsMap = normalizedView(cartItems)

  const handleClearAllClick = (): void => {
    clearCart()
    router.replace(routeNames.root)
  }

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>Ваш заказ</h2>
        <Button color="secondary" className={styles.deleteButton} onClick={handleClearAllClick}>
          Удалить все
        </Button>
      </div>
      {loading ? (
        <ListSkeleton max={3} itemsAmount={cartItems.length} />
      ) : (
        <ul className={styles.list}>
          {cartProducts.map((product) => (
            <CartItem key={product.id} amount={itemsMap[product.id]} product={product} />
          ))}
        </ul>
      )}
    </div>
  )
}
