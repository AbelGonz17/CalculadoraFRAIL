/**
 * Estos datos imitan la respuesta que recibirías de Prisma
 * después de pasar por tus middlewares de logging.
 */
export const mockLogs = [
  {
    id: '7b1a82f0-1c23-4e5a-8b9c-d0e1f2a3b4c5',
    model: 'User',
    action: 'POST',
    recordId: 'usr_01J2K3L4M5',
    userId: 'admin_01',
    ip: '192.168.1.45',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    data: {
      operation: 'create',
      args: {
        email: 'nuevo.usuario@empresa.com',
        role: 'EDITOR',
        name: 'Juan Pérez'
      },
      duration: 145,
      path: '/api/users',
      statusCode: 201
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() // Hace 5 minutos
  },
  {
    id: 'f4d3c2b1-a0b1-c2d3-e4f5-g6h7i8j9k0l1',
    model: 'Product',
    action: 'UPDATE',
    recordId: 'prod_882299',
    userId: 'manager_02',
    ip: '185.20.10.11',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15',
    data: {
      operation: 'update',
      args: {
        where: { id: 'prod_882299' },
        data: { stock: 15, price: 299.99 }
      },
      duration: 89,
      method: 'PATCH',
      path: '/api/products/prod_882299'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // Hace 2 horas
  },
  {
    id: 'e1e2e3e4-f5f6-g7g8-h9h0-i1i2i3i4i5i6',
    model: 'Auth',
    action: 'ERROR',
    recordId: null,
    userId: 'guest_99',
    ip: '92.144.5.120',
    userAgent: 'PostmanRuntime/7.36.0',
    data: {
      operation: 'findUnique',
      error: 'Invalid password for user \'guest_99\'',
      args: { where: { email: 'ataca@hack.com' } },
      duration: 22
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // Ayer
  },
  {
    id: 'd9c8b7a6-0504-0302-0100-f9e8d7c6b5a4',
    model: 'Order',
    action: 'DELETE',
    recordId: 'ord_554433',
    userId: 'admin_01',
    ip: '127.0.0.1',
    userAgent: 'Insomnia/2023.12.0',
    data: {
      operation: 'delete',
      args: { id: 'ord_554433' },
      duration: 310
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // Hace 2 días
  },
  {
    id: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
    model: 'Category',
    action: 'POST',
    recordId: 'cat_electronics',
    userId: null,
    ip: '172.16.0.5',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
    data: {
      operation: 'create',
      args: { name: 'Electrónica', slug: 'electronica' },
      duration: 65,
      statusCode: 200
    },
    createdAt: new Date(Date.now() - 1000 * 30).toISOString() // Hace 30 segundos
  }
]
