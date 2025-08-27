import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  Eye,
  Package,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 1247,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    category: "Electronics",
    inStock: true,
    description:
      "High-quality wireless headphones with noise cancellation and premium sound quality.",
    features: [
      "Noise Cancellation",
      "30hr Battery",
      "Quick Charge",
      "Premium Sound",
    ],
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.6,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    category: "Electronics",
    inStock: true,
    description:
      "Advanced fitness tracking with heart rate monitoring and GPS capabilities.",
    features: [
      "Heart Rate Monitor",
      "GPS Tracking",
      "Water Resistant",
      "Sleep Tracking",
    ],
  },
  {
    id: 3,
    name: "Organic Coffee Beans",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviews: 543,
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    category: "Food & Beverage",
    inStock: true,
    description:
      "Premium organic coffee beans sourced from sustainable farms around the world.",
    features: ["100% Organic", "Fair Trade", "Single Origin", "Fresh Roasted"],
  },
  {
    id: 4,
    name: "Designer Backpack",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviews: 756,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    category: "Fashion",
    inStock: true,
    description:
      "Stylish and functional backpack perfect for work, travel, or everyday use.",
    features: [
      "Water Resistant",
      "Multiple Pockets",
      "Ergonomic Design",
      "Durable Material",
    ],
  },
  {
    id: 5,
    name: "Smart Home Security Camera",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.5,
    reviews: 1023,
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=300&fit=crop",
    category: "Electronics",
    inStock: false,
    description:
      "4K smart security camera with night vision and motion detection.",
    features: [
      "4K Resolution",
      "Night Vision",
      "Motion Detection",
      "Cloud Storage",
    ],
  },
  {
    id: 6,
    name: "Herbal Tea Collection",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.8,
    reviews: 445,
    image:
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=300&h=300&fit=crop",
    category: "Food & Beverage",
    inStock: true,
    description:
      "Carefully curated collection of premium herbal teas from around the world.",
    features: [
      "Organic Ingredients",
      "Caffeine Free",
      "20 Blend Variety",
      "Eco-Friendly Packaging",
    ],
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviews: 678,
    image:
      "https://images.unsplash.com/photo-1609592806425-14e8b25b7c6a?w=300&h=300&fit=crop",
    category: "Electronics",
    inStock: true,
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    features: [
      "Fast Charging",
      "Qi Compatible",
      "LED Indicator",
      "Compact Design",
    ],
  },
  {
    id: 8,
    name: "Vintage Leather Wallet",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviews: 312,
    image:
      "https://images.unsplash.com/photo-1627123424573-724c3ebbb935?w=300&h=300&fit=crop",
    category: "Fashion",
    inStock: true,
    description:
      "Handcrafted genuine leather wallet with RFID protection and multiple card slots.",
    features: [
      "Genuine Leather",
      "RFID Protection",
      "8 Card Slots",
      "Handcrafted",
    ],
  },
];

const categories = ["All", "Electronics", "Fashion", "Food & Beverage"];
const priceRanges = ["All", "Under $50", "$50-$100", "$100-$200", "Over $200"];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = sampleProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      let matchesPrice = true;
      if (selectedPriceRange !== "All") {
        switch (selectedPriceRange) {
          case "Under $50":
            matchesPrice = product.price < 50;
            break;
          case "$50-$100":
            matchesPrice = product.price >= 50 && product.price <= 100;
            break;
          case "$100-$200":
            matchesPrice = product.price >= 100 && product.price <= 200;
            break;
          case "Over $200":
            matchesPrice = product.price > 200;
            break;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const ProductCard = ({
    product,
  }: {
    product: (typeof sampleProducts)[0];
  }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:border-primary/20">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm font-medium">
                Out of Stock
              </Badge>
            </div>
          )}
          {product.originalPrice > product.price && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="text-sm text-muted-foreground ml-1">
                  {product.rating} ({product.reviews})
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" disabled={!product.inStock}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Eye className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{product.name}</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full rounded-lg"
                  />
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-primary">
                          ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {product.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Key Features:</h4>
                        <ul className="space-y-1">
                          {product.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Button className="w-full" disabled={!product.inStock}>
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProductSkeleton = () => (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-0">
        <Skeleton className="h-48 w-full rounded-t-lg" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-1/4" />
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* SEO Meta Tags (Note: In production, use React Helmet or similar) */}
        <head>
          <title>
            Premium Products | High-Quality Electronics, Fashion & More
          </title>
          <meta
            name="description"
            content="Discover our premium collection of electronics, fashion items, and lifestyle products. Shop with confidence and enjoy fast shipping."
          />
          <meta
            name="keywords"
            content="products, electronics, fashion, shopping, premium quality"
          />
          <meta
            property="og:title"
            content="Premium Products | High-Quality Electronics, Fashion & More"
          />
          <meta
            property="og:description"
            content="Discover our premium collection of electronics, fashion items, and lifestyle products."
          />
          <meta property="og:type" content="website" />
        </head>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Discover our premium collection of high-quality products
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Filter Products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Products</label>
                <Input
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <Select
                  value={selectedPriceRange}
                  onValueChange={setSelectedPriceRange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">
                      Price (Low to High)
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price (High to Low)
                    </SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {sampleProducts.length}{" "}
                products
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedPriceRange("All");
                  setSortBy("name");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedPriceRange("All");
                }}
              >
                Clear Filters
              </Button>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Products;
