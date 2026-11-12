// os produtos exibidos na vitrine principal e as imagens tbm
const categorias = [
    {
        nome: "Processadores",
        imagem: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "Placas de vídeo",
        imagem: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "Placas-mãe",
        imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "Memórias RAM",
        imagem: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "SSDs e armazenamento",
        imagem: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "Fontes",
        imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "Gabinetes",
        imagem: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "Water coolers",
        imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "Air coolers",
        imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "Periféricos",
        imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80"
    }
];

// Catálogo com 35 produtos a baixo
const produtos = [
    {
        id: 1,
        nome: "Redragon Kumara K552 RGB",
        marca: "REDRAGON",
        categoria: "Periféricos",
        preco: 219.90,
        precoPromocional: 219.90,
        estoque: 35,
        imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        nome: "Kingston NV2 1TB NVMe",
        marca: "KINGSTON",
        categoria: "SSDs e armazenamento",
        preco: 399.90,
        precoPromocional: 399.90,
        estoque: 40,
        imagem: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        nome: "AMD Ryzen 7 7800X3D",
        marca: "AMD",
        categoria: "Processadores",
        preco: 2399.90,
        precoPromocional: 2199.90,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        nome: "NVIDIA GeForce RTX 4060 8GB",
        marca: "NVIDIA",
        categoria: "Placas de vídeo",
        preco: 2099.90,
        precoPromocional: 2099.90,
        estoque: 15,
        imagem: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        nome: "AMD Ryzen 5 5600",
        marca: "AMD",
        categoria: "Processadores",
        preco: 699.90,
        precoPromocional: 629.90,
        estoque: 25,
        imagem: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        nome: "Kingston Fury Beast 32GB (2x16) DDR5 6000",
        marca: "KINGSTON",
        categoria: "Memórias RAM",
        preco: 799.90,
        precoPromocional: 729.90,
        estoque: 22,
        imagem: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        nome: "Thermalright Peerless Assassin 120",
        marca: "THERMALRIGHT",
        categoria: "Air coolers",
        preco: 249.90,
        precoPromocional: 249.90,
        estoque: 20,
        imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        nome: "NVIDIA GeForce RTX 4070 Super 12GB",
        marca: "NVIDIA",
        categoria: "Placas de vídeo",
        preco: 4699.90,
        precoPromocional: 4299.90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        nome: "XPG Spectrix D35G 16GB (2x8) DDR4 3200",
        marca: "XPG",
        categoria: "Memórias RAM",
        preco: 349.90,
        precoPromocional: 299.90,
        estoque: 30,
        imagem: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        nome: "AMD Ryzen 5 7600",
        marca: "AMD",
        categoria: "Processadores",
        preco: 1199.90,
        precoPromocional: 1199.90,
        estoque: 18,
        imagem: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 11,
        nome: "MSI B550M Pro-VDH",
        marca: "MSI",
        categoria: "Placas-mãe",
        preco: 649.90,
        precoPromocional: 649.90,
        estoque: 20,
        imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 12,
        nome: "MSI MAG A650BN 650W 80 Plus Bronze",
        marca: "MSI",
        categoria: "Fontes",
        preco: 379.90,
        precoPromocional: 349.90,
        estoque: 25,
        imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 13,
        nome: "Logitech G Pro X Superlight 2",
        marca: "LOGITECH",
        categoria: "Periféricos",
        preco: 999.90,
        precoPromocional: 899.90,
        estoque: 14,
        imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 14,
        nome: "Intel Core i5-14400F",
        marca: "INTEL",
        categoria: "Processadores",
        preco: 1149.90,
        precoPromocional: 1049.90,
        estoque: 14,
        imagem: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 15,
        nome: "Samsung 990 Pro 2TB NVMe",
        marca: "SAMSUNG",
        categoria: "SSDs e armazenamento",
        preco: 1399.90,
        precoPromocional: 1249.90,
        estoque: 12,
        imagem: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 16,
        nome: "DeepCool AK620",
        marca: "DEEPCOOL",
        categoria: "Air coolers",
        preco: 449.90,
        precoPromocional: 399.90,
        estoque: 12,
        imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 17,
        nome: "Intel Core i7-14700K",
        marca: "INTEL",
        categoria: "Processadores",
        preco: 2599.90,
        precoPromocional: 2599.90,
        estoque: 7,
        imagem: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 18,
        nome: "Montech Air 100 ARGB",
        marca: "MONTECH",
        categoria: "Gabinetes",
        preco: 349.90,
        precoPromocional: 299.90,
        estoque: 15,
        imagem: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 19,
        nome: "AMD Radeon RX 7800 XT 16GB",
        marca: "AMD",
        categoria: "Placas de vídeo",
        preco: 3699.90,
        precoPromocional: 3399.90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 20,
        nome: "Corsair RM850e 850W 80 Plus Gold",
        marca: "CORSAIR",
        categoria: "Fontes",
        preco: 899.90,
        precoPromocional: 899.90,
        estoque: 15,
        imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 21,
        nome: "Rise Mode Gamer Black 240mm",
        marca: "RISE MODE",
        categoria: "Water coolers",
        preco: 349.90,
        precoPromocional: 349.90,
        estoque: 18,
        imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 22,
        nome: "ASUS TUF Gaming B650-Plus",
        marca: "ASUS",
        categoria: "Placas-mãe",
        preco: 1499.90,
        precoPromocional: 1499.90,
        estoque: 9,
        imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 23,
        nome: "Corsair Vengeance RGB 32GB (2x16) DDR5 6400",
        marca: "CORSAIR",
        categoria: "Memórias RAM",
        preco: 949.90,
        precoPromocional: 949.90,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 24,
        nome: "HyperX Cloud III",
        marca: "HYPERX",
        categoria: "Periféricos",
        preco: 599.90,
        precoPromocional: 549.90,
        estoque: 3,
        imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 25,
        nome: "Lian Li Lancool 216",
        marca: "LIAN LI",
        categoria: "Gabinetes",
        preco: 699.90,
        precoPromocional: 649.90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 26,
        nome: "Gigabyte B650M Aorus Elite",
        marca: "GIGABYTE",
        categoria: "Placas-mãe",
        preco: 1299.90,
        precoPromocional: 1199.90,
        estoque: 11,
        imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 27,
        nome: "WD Black SN850X 1TB",
        marca: "WESTERN DIGITAL",
        categoria: "SSDs e armazenamento",
        preco: 749.90,
        precoPromocional: 679.90,
        estoque: 9,
        imagem: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 28,
        nome: "AMD Radeon RX 7600 8GB",
        marca: "AMD",
        categoria: "Placas de vídeo",
        preco: 1749.90,
        precoPromocional: 1749.90,
        estoque: 0,
        imagem: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 29,
        nome: "NZXT H5 Flow",
        marca: "NZXT",
        categoria: "Gabinetes",
        preco: 649.90,
        precoPromocional: 649.90,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 30,
        nome: "Corsair iCUE H150i Elite 360mm",
        marca: "CORSAIR",
        categoria: "Water coolers",
        preco: 1199.90,
        precoPromocional: 1099.90,
        estoque: 6,
        imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 31,
        nome: "ASUS ROG Strix Z790-E",
        marca: "ASUS",
        categoria: "Placas-mãe",
        preco: 3499.90,
        precoPromocional: 3199.90,
        estoque: 4,
        imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 32,
        nome: "Seasonic Focus GX-1000 1000W",
        marca: "SEASONIC",
        categoria: "Fontes",
        preco: 1399.90,
        precoPromocional: 1399.90,
        estoque: 5,
        imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 33,
        nome: "ASRock B760M-ITX/D4",
        marca: "ASROCK",
        categoria: "Placas-mãe",
        preco: 899.90,
        precoPromocional: 899.90,
        estoque: 6,
        imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 34,
        nome: "Cooler Master NR200P",
        marca: "COOLER MASTER",
        categoria: "Gabinetes",
        preco: 599.90,
        precoPromocional: 599.90,
        estoque: 4,
        imagem: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 35,
        nome: "NVIDIA GeForce RTX 4090 24GB",
        marca: "NVIDIA",
        categoria: "Placas de vídeo",
        preco: 13999.90,
        precoPromocional: 13999.90,
        estoque: 2,
        imagem: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80"
    }
];