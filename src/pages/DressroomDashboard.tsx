import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import PixelButton from '@/components/PixelButton';
import { toast } from 'sonner';

type EquipmentSlot = 'hat' | 'top' | 'bottom' | 'shoes' | 'weapon' | 'cape' | 'face' | 'accessory';

interface EquipmentItem {
  id: string;
  name: string;
  slot: EquipmentSlot;
  imageUrl: string;
  stats: {
    str?: number;
    dex?: number;
    int?: number;
    luk?: number;
    hp?: number;
    mp?: number;
    attack?: number;
    defense?: number;
  };
}

const DressroomDashboard = () => {
  const [activeSlot, setActiveSlot] = useState<EquipmentSlot | null>(null);
  const [equipment, setEquipment] = useState<Record<EquipmentSlot, EquipmentItem | null>>({
    hat: null,
    top: null,
    bottom: null,
    shoes: null,
    weapon: null,
    cape: null,
    face: null,
    accessory: null
  });
  
  const [inventoryItems] = useState<EquipmentItem[]>([
    {
      id: 'hat1',
      name: 'Maple Hat',
      slot: 'hat',
      imageUrl: 'https://placehold.co/100/2A1A3E/A3F0E0?text=Hat1',
      stats: { str: 5, dex: 3, defense: 10 }
    },
    {
      id: 'hat2',
      name: 'Royal Hat',
      slot: 'hat',
      imageUrl: 'https://placehold.co/100/2A1A3E/A3F0E0?text=Hat2',
      stats: { str: 3, int: 5, defense: 12 }
    },
    {
      id: 'top1',
      name: 'Maple Shirt',
      slot: 'top',
      imageUrl: 'https://placehold.co/100/2A1A3E/A3F0E0?text=Top1',
      stats: { defense: 15, hp: 20 }
    },
    {
      id: 'weapon1',
      name: 'Maple Staff',
      slot: 'weapon',
      imageUrl: 'https://placehold.co/100/2A1A3E/A3F0E0?text=Staff',
      stats: { int: 10, attack: 25 }
    },
    {
      id: 'weapon2',
      name: 'Maple Sword',
      slot: 'weapon',
      imageUrl: 'https://placehold.co/100/2A1A3E/A3F0E0?text=Sword',
      stats: { str: 10, attack: 30 }
    }
  ]);
  
  const filteredItems = activeSlot 
    ? inventoryItems.filter(item => item.slot === activeSlot)
    : inventoryItems;

  const handleEquip = (item: EquipmentItem) => {
    setEquipment(prev => ({
      ...prev,
      [item.slot]: item
    }));
    toast.success(`Equipped ${item.name}!`);
  };
  
  const handleUnequip = (slot: EquipmentSlot) => {
    if (equipment[slot]) {
      setEquipment(prev => ({
        ...prev,
        [slot]: null
      }));
      toast.info(`Unequipped ${equipment[slot]?.name}!`);
    }
  };
  
  const calculateTotalStats = () => {
    const stats = {
      str: 0,
      dex: 0,
      int: 0,
      luk: 0,
      hp: 0,
      mp: 0,
      attack: 0,
      defense: 0
    };
    
    Object.values(equipment).forEach(item => {
      if (item) {
        Object.entries(item.stats).forEach(([stat, value]) => {
          stats[stat as keyof typeof stats] += value || 0;
        });
      }
    });
    
    return stats;
  };
  
  const totalStats = calculateTotalStats();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2A1A3E] bg-starry-pattern bg-cover bg-center">
      <NavBar />
      
      <motion.div 
        className="container mx-auto pt-24 px-4 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-[#A3F0E0] text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Dressroom
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="bg-[#1A0B2E]/90 p-6 col-span-1 border-2 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-[#A3F0E0] mb-4 text-center">Character</h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="relative bg-[#2A1A3E]/60 w-48 h-48 rounded-md mb-4 flex items-center justify-center">
                <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center">
                  {equipment.hat && (
                    <div className="absolute top-0" style={{ zIndex: 10 }}>
                      <img src={equipment.hat.imageUrl} alt="Hat" className="w-16 h-16 object-contain" />
                    </div>
                  )}
                  
                  {equipment.face && (
                    <div className="absolute top-16" style={{ zIndex: 9 }}>
                      <img src={equipment.face.imageUrl} alt="Face" className="w-12 h-12 object-contain" />
                    </div>
                  )}
                  
                  {equipment.top && (
                    <div className="absolute top-28" style={{ zIndex: 8 }}>
                      <img src={equipment.top.imageUrl} alt="Top" className="w-20 h-20 object-contain" />
                    </div>
                  )}
                  
                  {equipment.bottom && (
                    <div className="absolute top-44" style={{ zIndex: 7 }}>
                      <img src={equipment.bottom.imageUrl} alt="Bottom" className="w-16 h-16 object-contain" />
                    </div>
                  )}
                  
                  {equipment.shoes && (
                    <div className="absolute top-60" style={{ zIndex: 6 }}>
                      <img src={equipment.shoes.imageUrl} alt="Shoes" className="w-14 h-14 object-contain" />
                    </div>
                  )}
                  
                  {equipment.cape && (
                    <div className="absolute top-28 left-[-10px]" style={{ zIndex: 5 }}>
                      <img src={equipment.cape.imageUrl} alt="Cape" className="w-16 h-28 object-contain" />
                    </div>
                  )}
                  
                  {equipment.weapon && (
                    <div className="absolute top-28 right-[-20px]" style={{ zIndex: 11 }}>
                      <img src={equipment.weapon.imageUrl} alt="Weapon" className="w-20 h-20 object-contain" />
                    </div>
                  )}
                  
                  {equipment.accessory && (
                    <div className="absolute top-24 left-10" style={{ zIndex: 12 }}>
                      <img src={equipment.accessory.imageUrl} alt="Accessory" className="w-10 h-10 object-contain" />
                    </div>
                  )}
                  
                  <svg className="w-20 h-32 text-[#A3F0E0]/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl text-[#FF66B3] font-bold">Guest</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-[#FF66B3]/50 pt-4">
              <div>
                <p className="text-white/90">STR: <span className="text-[#A3F0E0]">{totalStats.str}</span></p>
                <p className="text-white/90">DEX: <span className="text-[#A3F0E0]">{totalStats.dex}</span></p>
                <p className="text-white/90">INT: <span className="text-[#A3F0E0]">{totalStats.int}</span></p>
                <p className="text-white/90">LUK: <span className="text-[#A3F0E0]">{totalStats.luk}</span></p>
              </div>
              <div>
                <p className="text-white/90">HP: <span className="text-[#A3F0E0]">+{totalStats.hp}</span></p>
                <p className="text-white/90">MP: <span className="text-[#A3F0E0]">+{totalStats.mp}</span></p>
                <p className="text-white/90">ATK: <span className="text-[#A3F0E0]">{totalStats.attack}</span></p>
                <p className="text-white/90">DEF: <span className="text-[#A3F0E0]">{totalStats.defense}</span></p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-[#1A0B2E]/90 p-6 col-span-1 border-2 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-[#A3F0E0] mb-4 text-center">Equipment</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {(Object.keys(equipment) as EquipmentSlot[]).map((slot) => (
                <div 
                  key={slot}
                  className={`bg-[#2A1A3E]/60 rounded-md p-2 cursor-pointer transition-all ${
                    activeSlot === slot ? 'ring-2 ring-[#A3F0E0]' : ''
                  }`}
                  onClick={() => setActiveSlot(slot)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-white/90 capitalize">{slot}</span>
                    {equipment[slot] && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnequip(slot);
                        }}
                        className="text-[#FF66B3] hover:text-[#FF66B3]/70 text-sm"
                      >
                        x
                      </button>
                    )}
                  </div>
                  
                  <div className="h-16 bg-[#1A0B2E]/50 rounded flex items-center justify-center">
                    {equipment[slot] ? (
                      <img 
                        src={equipment[slot]?.imageUrl} 
                        alt={equipment[slot]?.name} 
                        className="max-h-14 max-w-14 object-contain"
                      />
                    ) : (
                      <span className="text-[#A3F0E0]/50">Empty</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="bg-[#1A0B2E]/90 p-6 col-span-1 border-2 border-[#FF66B3] shadow-[0_0_5px_rgba(255,102,179,0.2)] rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#A3F0E0]">Inventory</h2>
              
              <div className="flex items-center gap-2">
                <select 
                  className="bg-[#2A1A3E]/60 border-2 border-[#FF66B3] text-white rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#FF66B3] text-sm"
                  value={activeSlot || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setActiveSlot(value ? value as EquipmentSlot : null);
                  }}
                >
                  <option value="">All Items</option>
                  {(Object.keys(equipment) as EquipmentSlot[]).map((slot) => (
                    <option key={slot} value={slot}>{slot.charAt(0).toUpperCase() + slot.slice(1)}</option>
                  ))}
                </select>
                
                {activeSlot && (
                  <button 
                    onClick={() => setActiveSlot(null)}
                    className="text-white/90 hover:text-[#A3F0E0]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[400px] pr-2">
              {filteredItems.length > 0 ? (
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-[#2A1A3E]/60 hover:bg-[#2A1A3E]/80 rounded-md p-3 cursor-pointer border border-[#FF66B3]/50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 8px rgba(255,102,179,0.4)" }}
                      onClick={() => handleEquip(item)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-[#1A0B2E]/70 rounded w-16 h-16 flex items-center justify-center">
                          <img src={item.imageUrl} alt={item.name} className="max-h-14 max-w-14 object-contain" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-white/90 font-bold">{item.name}</h3>
                          <p className="text-[#A3F0E0]/80 text-sm capitalize">{item.slot}</p>
                          
                          <div className="grid grid-cols-2 gap-x-2 mt-1 text-xs">
                            {Object.entries(item.stats).map(([stat, value]) => (
                              value ? (
                                <div key={stat} className="text-[#A3F0E0]">
                                  {stat.toUpperCase()}: +{value}
                                </div>
                              ) : null
                            ))}
                          </div>
                        </div>
                        
                        <PixelButton
                          variant="secondary" 
                          size="sm"
                          className="bg-[#FF66B3] hover:bg-[#FF66B3]/80 text-white border-2 border-[#A3F0E0]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEquip(item);
                          }}
                        >
                          Equip
                        </PixelButton>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-white/90">
                  <p>No items found for this slot.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-white/70 text-sm">
            Tip: Click on equipment slots to filter the inventory items
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DressroomDashboard;