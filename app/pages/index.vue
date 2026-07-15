<script setup lang="ts">
import { projectConfig } from '~/project.config'
import { ref, computed } from 'vue'

definePageMeta({
})

useSeoMeta({
  title: 'Cuestionario FRAIL - ' + projectConfig.name,
  description: 'Detector de fragilidad funcional'
})

interface Question {
  id: string
  letter: string
  title: string
  enTitle: string
  text: string
  subtitle: string
  answer: boolean | null
}

const questions = ref<Question[]>([
  { id: 'f', letter: 'F', title: 'Fatiga', enTitle: 'Fatigue', text: '¿Se ha sentido cansado la mayor parte del tiempo en las últimas 4 semanas?', subtitle: 'Incluye sentirse agotado al hacer cosas que antes hacía sin esfuerzo.', answer: null },
  { id: 'r', letter: 'R', title: 'Resistencia', enTitle: 'Resistance', text: '¿Tiene dificultad para subir un piso de escaleras sin detenerse?', subtitle: 'Sin ayuda de otra persona y sin aparatos de asistencia.', answer: null },
  { id: 'a', letter: 'A', title: 'Movilidad', enTitle: 'Ambulation', text: '¿Tiene dificultad para caminar una cuadra (100 metros)?', subtitle: 'Sin ayuda de otra persona y sin aparatos de asistencia.', answer: null },
  { id: 'i', letter: 'I', title: 'Enfermedades', enTitle: 'Illnesses', text: '¿Tiene más de 5 enfermedades crónicas?', subtitle: 'Diagnóstico médico previo de enfermedades importantes.', answer: null },
  { id: 'l', letter: 'L', title: 'Pérdida de peso', enTitle: 'Loss of weight', text: '¿Ha perdido más del 5% de su peso en los últimos 6 meses?', subtitle: 'Pérdida de peso corporal de forma involuntaria.', answer: null }
])

const score = computed(() => {
  return questions.value.reduce((acc, q) => acc + (q.answer === true ? 1 : 0), 0)
})

const isComplete = computed(() => {
  return questions.value.every(q => q.answer !== null)
})

const classification = computed(() => {
  const s = score.value
  if (s === 0) return { label: 'Robusto', bgClass: 'bg-green-500', textClass: 'text-green-500' }
  if (s >= 1 && s <= 2) return { label: 'Pre-frágil', bgClass: 'bg-yellow-500', textClass: 'text-yellow-500' }
  if (s >= 3 && s <= 5) return { label: 'Frágil', bgClass: 'bg-red-500', textClass: 'text-red-500' }
  return null
})

const reset = () => {
  questions.value.forEach(q => q.answer = null)
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="bg-[#F4F6F7] min-h-[calc(100vh-250px)]">
    <div class="p-4 sm:p-6 space-y-6 max-w-2xl mx-auto pb-20">
      
      <!-- Intro Card -->
      <div class="bg-white rounded-2xl shadow-sm border-l-[6px] border-[#F39C12] p-5 sm:p-6 mt-4 sm:mt-6">
        <p class="text-slate-600 leading-relaxed text-sm sm:text-base">
          La <span class="font-bold text-slate-800">Escala FRAIL</span> es una herramienta clínica validada para detectar fragilidad en el adulto mayor. Responde las 5 preguntas y obtén el resultado al instante.
        </p>
      </div>

      <!-- Section Title -->
      <div class="pt-4 pb-1">
        <h2 class="text-[#D68910] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
          Responde las 5 preguntas
        </h2>
      </div>

      <div>         
        <div class="space-y-4">
          <div v-for="(q, index) in questions" :key="q.id" class="bg-white rounded-[24px] p-5 sm:p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div class="flex gap-4 sm:gap-6">
              <!-- Letter -->
              <div class="text-[36px] sm:text-[44px] font-black text-[#F39C12] leading-none pt-1 shrink-0">
                {{ q.letter }}
              </div>
              
              <!-- Content -->
              <div class="flex-1">
                <p class="text-[10px] text-slate-400 tracking-[0.15em] font-bold uppercase mb-2">
                  {{ q.enTitle }} &middot; {{ q.title }}
                </p>
                <h3 class="text-[#2C3E50] font-bold text-lg sm:text-xl leading-snug mb-2">
                  {{ q.text }}
                </h3>
                <p class="text-slate-500 text-sm mb-5">
                  {{ q.subtitle }}
                </p>
                
                <!-- Buttons -->
                <div class="flex gap-3">
                  <button
                    class="flex-1 justify-center py-3 rounded-[14px] border-2 text-base font-bold transition-colors"
                    :class="q.answer === true ? 'bg-slate-50 text-[#2C3E50] border-[#2C3E50] shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent'"
                    @click="q.answer = true"
                  >
                    Sí
                  </button>
                  <button
                    class="flex-1 justify-center py-3 rounded-[14px] border-2 text-base font-bold transition-colors"
                    :class="q.answer === false ? 'bg-slate-50 text-[#2C3E50] border-[#2C3E50] shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent'"
                    @click="q.answer = false"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Transition name="fade" mode="out-in">
          <div v-if="isComplete" class="mt-8">
            <div class="bg-white rounded-2xl shadow-md border-t-[8px] border-[#F39C12] p-6 sm:p-8">
              <h3 class="font-black text-[#2C3E50] text-xl mb-6 border-b border-slate-100 pb-4">Resultado de la Evaluación</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                <div class="space-y-3">
                  <div class="flex items-baseline gap-2">
                    <span class="text-lg font-bold text-slate-500">Puntaje total:</span>
                    <span class="font-black text-5xl text-[#2C3E50]">{{ score }}</span>
                    <span class="text-base text-slate-400 font-bold ml-1">/ 5</span>
                  </div>
                  <div v-if="score >= 3" class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-bold animate-pulse border border-red-100">
                    <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5" />
                    Sarcopenia probable
                  </div>
                </div>
                
                <div class="flex flex-col md:items-end p-5 rounded-[20px] bg-slate-50 border border-slate-100">
                  <span class="text-[11px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-2">Clasificación</span>
                  <div class="flex items-center gap-3">
                    <span class="text-3xl font-black" :class="classification?.textClass">
                      {{ classification?.label }}
                    </span>
                    <span class="w-5 h-5 rounded-full shadow-sm" :class="classification?.bgClass"></span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Action Button & Disclaimer -->
      <div class="mt-8 space-y-5">
        <button
          @click="reset"
          class="w-full flex items-center justify-center gap-2 py-4 rounded-[14px] border border-slate-200 text-[#435B71] font-bold text-base hover:bg-slate-50 transition-colors bg-white shadow-sm"
        >
          <UIcon name="i-heroicons-arrow-path" class="w-5 h-5" />
          Volver a evaluar
        </button>

        <div class="bg-[#2C3E50] rounded-[16px] p-5 sm:p-6 text-[13px] sm:text-sm text-slate-300 leading-relaxed shadow-md text-center sm:text-left">
          <span class="text-[#F39C12] font-bold">Importante:</span> Esta calculadora es una herramienta de orientación clínica, no un diagnóstico. Los resultados deben ser interpretados por un profesional de salud en el contexto individual del paciente.
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.text-muted {
  color: var(--text-secondary);
}
.bg-accented {
  background-color: var(--surface-2);
}
.border-border {
  border-color: var(--border);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
