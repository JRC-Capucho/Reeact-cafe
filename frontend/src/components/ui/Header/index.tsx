import styles from './styles.module.scss';
import Image from 'next/image'
import logoImage from '../../../../public/header.png'
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';


export default function Header() {
  const { signOut } = useContext(AuthContext)
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href={'/dashboard'} >
          <Image src={logoImage} alt="logo" width={70} height={70} />
        </Link>
        <nav className={styles.menu}>
          <Link href='/category'><p>Category</p></Link>
          <Link href='/product'><p>Product</p></Link>
          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>
        </nav>
      </div>
    </header>
  )
}
