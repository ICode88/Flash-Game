"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import DenominationCard from "@/components/checkout/DenominationCard";
import PaymentMethodCard from "@/components/checkout/PaymentMethodCard";
import SectionHeading from "@/components/ui/section-heading";

import { Game, GameDenomination, PaymentMethod, Transaction } from "@/types";
import { getGameBySlug, getDenominationsByGameId } from "@/data/games";
import { getAllPaymentMethods, getPaymentMethodById } from "@/data/payment-methods";
import { formatCurrency, formatWhatsAppNumber, validateGameId, validateWhatsAppNumber } from "@/lib/utils";
import { storage } from "@/lib/storage";
import { createTransaction } from "@/data/transactions";
import { sendTransactionConfirmation } from "@/lib/whatsapp";

export default function GameDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [game, setGame] = useState<Game | null>(null);
  const [denominations, setDenominations] = useState<GameDenomination[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  
  const [userId, setUserId] = useState("");
  const [server, setServer] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [selectedDenomination, setSelectedDenomination] = useState<GameDenomination | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  
  // Load game data
  useEffect(() => {
    const gameData = getGameBySlug(params.slug);
    if (gameData) {
      setGame(gameData);
      const gameDenominations = getDenominationsByGameId(gameData.id);
      setDenominations(gameDenominations);
      setPaymentMethods(getAllPaymentMethods());
      
      // Load stored game account if available
      const storedAccount = storage.getGameAccount(gameData.id);
      if (storedAccount) {
        setUserId(storedAccount.userId);
        if (storedAccount.server) {
          setServer(storedAccount.server);
        }
      }
      
      // Load stored WhatsApp number if available
      const storedNumber = storage.getWhatsAppNumber();
      if (storedNumber) {
        setWhatsappNumber(storedNumber);
      }
    } else {
      router.push("/games");
    }
  }, [params.slug, router]);
  
  // Handle denomination selection
  const handleSelectDenomination = (denomination: GameDenomination) => {
    setSelectedDenomination(denomination);
  };
  
  // Handle payment method selection
  const handleSelectPaymentMethod = (paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };
  
  // Calculate total
  const calculateTotal = () => {
    if (!selectedDenomination) return 0;
    
    let total = selectedDenomination.discount 
      ? Math.round(selectedDenomination.price - (selectedDenomination.price * selectedDenomination.discount / 100))
      : selectedDenomination.price;
    
    if (selectedPaymentMethod && selectedPaymentMethod.fee > 0) {
      total += selectedPaymentMethod.fee;
    }
    
    // Apply promo code (dummy implementation)
    if (promoCode.toLowerCase() === "flash10") {
      total = Math.round(total * 0.9); // 10% discount
    }
    
    return total;
  };
  
  // Check if form is valid
  const isFormValid = () => {
    if (!validateGameId(userId)) return false;
    if (!validateWhatsAppNumber(whatsappNumber)) return false;
    if (game?.name === "Mobile Legends" && !server.trim()) return false;
    if (!selectedDenomination || !selectedPaymentMethod) return false;
    return true;
  };
  
  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    if (!isFormValid()) {
      toast.error("Mohon lengkapi semua data yang diperlukan");
      return;
    }
    
    setConfirmDialogOpen(true);
  };
  
  // Handle confirm checkout
  const handleConfirmCheckout = async () => {
    if (!game || !selectedDenomination || !selectedPaymentMethod) return;
    
    setIsProcessing(true);
    
    try {
      // Store game ID and WhatsApp number
      storage.saveGameId(game.id, userId, server);
      storage.saveWhatsAppNumber(whatsappNumber);
      
      // Create transaction
      const newTransaction = createTransaction({
        gameId: game.id,
        gameName: game.name,
        gameImage: game.image,
        userId,
        server,
        denomination: selectedDenomination.amount,
        price: calculateTotal(),
        paymentMethodId: selectedPaymentMethod.id,
        paymentMethod: selectedPaymentMethod.name,
        paymentMethodType: selectedPaymentMethod.type,
        status: "pending",
        whatsappNumber: formatWhatsAppNumber(whatsappNumber),
      });
      
      // Save recent transaction
      storage.saveRecentTransaction(newTransaction.id);
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send WhatsApp notification
      await sendTransactionConfirmation(newTransaction);
      
      setTransaction(newTransaction);
      setConfirmDialogOpen(false);
      
      // Redirect to transaction page
      router.push(`/transactions/${newTransaction.id}`);
    } catch (error) {
      console.error("Error processing transaction:", error);
      toast.error("Gagal memproses transaksi. Silakan coba lagi.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (!game) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }
  
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <Card>
              <div className="aspect-square w-full overflow-hidden rounded-t-lg">
                <img
                  src={game.image}
                  alt={game.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>{game.publisher}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Mitra TopUp Resmi</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Waktu Proses:</strong> Instan setelah pembayaran
                  </p>
                  <p>
                    <strong>Platform:</strong> Mobile, PC
                  </p>
                  <p>
                    <strong>Region:</strong> Indonesia
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* TopUp Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>TopUp {game.name}</CardTitle>
                <CardDescription>
                  Masukkan detail akun dan pilih nominal topup
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Account Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informasi Akun</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="userId" className="text-sm font-medium">
                        User ID <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Masukkan User ID"
                      />
                    </div>
                    
                    {game.name === "Mobile Legends" && (
                      <div className="space-y-2">
                        <label htmlFor="server" className="text-sm font-medium">
                          Server ID <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="server"
                          value={server}
                          onChange={(e) => setServer(e.target.value)}
                          placeholder="Masukkan Server ID"
                        />
                        <p className="text-xs text-muted-foreground">
                          Contoh: 12345
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-sm font-medium">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="whatsapp"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="Contoh: 08123456789"
                    />
                    <p className="text-xs text-muted-foreground">
                      Untuk notifikasi transaksi dan update status
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                {/* Products */}
                <div className="space-y-4">
                  <Tabs defaultValue="regular" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="regular">Regular</TabsTrigger>
                      <TabsTrigger value="special">Special</TabsTrigger>
                      <TabsTrigger value="bundle">Bundle</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="regular" className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {denominations.map((denom) => (
                          <DenominationCard
                            key={denom.id}
                            denomination={denom}
                            isSelected={selectedDenomination?.id === denom.id}
                            onSelect={handleSelectDenomination}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="special">
                      <div className="text-center py-8 text-muted-foreground">
                        Tidak ada item spesial yang tersedia saat ini
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="bundle">
                      <div className="text-center py-8 text-muted-foreground">
                        Tidak ada bundle yang tersedia saat ini
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <Separator />
                
                {/* Payment Methods */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Pilih Metode Pembayaran</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {paymentMethods.slice(0, 6).map((method) => (
                      <PaymentMethodCard
                        key={method.id}
                        paymentMethod={method}
                        isSelected={selectedPaymentMethod?.id === method.id}
                        onSelect={handleSelectPaymentMethod}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="space-y-2">
                  <label htmlFor="promo" className="text-sm font-medium">
                    Kode Promo (Opsional)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Masukkan kode promo"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (promoCode.toLowerCase() === "flash10") {
                          toast.success("Kode promo berhasil digunakan!");
                        } else {
                          toast.error("Kode promo tidak valid");
                        }
                      }}
                    >
                      Gunakan
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex-col space-y-4">
                {selectedDenomination && (
                  <div className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Harga:</span>
                      <span>{formatCurrency(selectedDenomination.price)}</span>
                    </div>
                    
                    {selectedDenomination.discount && (
                      <div className="flex justify-between text-sm mb-2">
                        <span>Diskon Item:</span>
                        <span className="text-green-600">
                          -{formatCurrency(selectedDenomination.price * selectedDenomination.discount / 100)}
                        </span>
                      </div>
                    )}
                    
                    {promoCode.toLowerCase() === "flash10" && (
                      <div className="flex justify-between text-sm mb-2">
                        <span>Diskon Promo:</span>
                        <span className="text-green-600">
                          -10%
                        </span>
                      </div>
                    )}
                    
                    {selectedPaymentMethod && selectedPaymentMethod.fee > 0 && (
                      <div className="flex justify-between text-sm mb-2">
                        <span>Biaya Admin:</span>
                        <span>{formatCurrency(selectedPaymentMethod.fee)}</span>
                      </div>
                    )}
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                )}
                
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  size="lg"
                  onClick={handleProceedToCheckout}
                  disabled={!isFormValid()}
                >
                  Lanjut ke Pembayaran
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Pesanan</DialogTitle>
            <DialogDescription>
              Mohon periksa kembali detail pesanan Anda sebelum melanjutkan pembayaran.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="font-medium">Game:</span>
              <span>{game.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">User ID:</span>
              <span>{userId}</span>
            </div>
            
            {server && (
              <div className="flex justify-between">
                <span className="font-medium">Server:</span>
                <span>{server}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="font-medium">Nominal:</span>
              <span>{selectedDenomination?.label}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">Metode Pembayaran:</span>
              <span>{selectedPaymentMethod?.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">WhatsApp:</span>
              <span>{whatsappNumber}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between font-semibold">
              <span>Total Pembayaran:</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
              disabled={isProcessing}
            >
              Batal
            </Button>
            <Button
              onClick={handleConfirmCheckout}
              disabled={isProcessing}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Konfirmasi & Bayar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}