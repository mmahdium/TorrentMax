<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMotion } from '@vueuse/motion'

const magnetInput = ref('')
const isLoading = ref(false)

// Light bar particles
interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  speed: number;
  size: number;
  symbol: string;
}

const particles = ref<Particle[]>([])

onMounted(() => {
  if (process.client) {
    initializeParticles()
  }
})

const symbols = ['✦', '✧', '★', '●', '◈', '◇', '◈']

const initializeParticles = () => {
  if (typeof window === 'undefined') return
  
  const particleCount = 20
  particles.value = []
  
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * 60, // Start from top area where light bar is
      opacity: Math.random() * 0.4 + 0.2,
      speed: Math.random() * 0.8 + 0.2,
      size: Math.random() * 8 + 4,
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    })
  }
  
  // Start animation
  animateParticles()
}

let animationFrameId: number

const animateParticles = () => {
  particles.value.forEach(particle => {
    // Move particles down
    particle.y += particle.speed
    
    // Reset particles that go off screen
    if (particle.y > window.innerHeight) {
      particle.y = Math.random() * 20
      particle.x = Math.random() * window.innerWidth
    }
  })
  
  // Continue animation
  animationFrameId = requestAnimationFrame(animateParticles)
}

const addTrackers = async () => {
  if (!magnetInput.value.trim()) return
  
  isLoading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoading.value = false
  
  // Here you would implement the actual tracker addition logic
  console.log('Adding trackers to:', magnetInput.value)
}

// Clean up animation on component unmount
onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <div class="min-h-screen bg-black text-white overflow-hidden relative">
    <!-- Single expanding radial gradient for seamless light -->
    <div 
      v-motion
      :initial="{ width: '0px', height: '0px', top: '-20%', left: '50%', transform: 'translateX(-50%)' }"
      :visibleOnce="{ 
        width: '200vw', 
        height: '200vh', 
        transition: { duration: 3000, ease: 'cubic-bezier(0.3, 0.7, 0.4, 1.0)' } 
      }"
      class="absolute z-0 opacity-40"
      :style="{
        background: 'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.25) 20%, transparent 50%)',
        'background-size': '100% 100%',
        'background-repeat': 'no-repeat'
      }"
    ></div>
    <!-- Additional bright center glow -->
    <div 
      v-motion
      :initial="{ opacity: 0 }"
      :visibleOnce="{ opacity: 0.5, transition: { duration: 500, delay: 300 } }"
      class="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-full bg-blue-400 blur-3xl z-0"
    ></div>
    
    <!-- Falling particles -->
    <div class="absolute inset-0 z-0">
      <div 
        v-for="particle in particles" 
        :key="particle.id"
        class="absolute text-blue-300/60 text-lg font-bold select-none pointer-events-none"
        :style="{
          left: particle.x + 'px',
          top: particle.y + 'px',
          opacity: particle.opacity,
          fontSize: particle.size + 'px',
          transform: 'translate(-50%, -50%)'
        }"
      >
        {{ particle.symbol }}
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
      <!-- Title with subtle fade in -->
      <div 
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, transition: { duration: 1000 } }"
        class="text-center mb-10"
      >
        <h1 class="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4 tracking-tight">
          TorrentMax
        </h1>
        <p class="text-gray-400 max-w-md mx-auto">
          Maximize your torrents with premium tracker integration
        </p>
      </div>

      <!-- Input and Button -->
      <div 
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, transition: { duration: 1000, delay: 300 } }"
        class="w-full max-w-2xl flex flex-col sm:flex-row gap-4"
      >
        <textarea
          v-model="magnetInput"
          placeholder="Enter magnet link or .torrent file content..."
          class="flex-grow px-6 py-4 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-500 min-h-[60px] max-h-[120px] resize-none shadow-inner focus:shadow-blue-500/10 focus:shadow-lg transition-all duration-300"
          rows="1"
        ></textarea>
        <button
          @click="addTrackers"
          :disabled="isLoading"
          class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-purple-600 transition-all duration-500 disabled:opacity-50 flex items-center justify-center whitespace-nowrap"
        >
          <span v-if="!isLoading" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Max It Out
          </span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        </button>
      </div>

      <div class="mt-10 text-center text-sm text-gray-600">
        <p>Your torrents will be enhanced with premium trackers for maximum performance</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Simple fade in animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}
</style>