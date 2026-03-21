import { PureAbility, AbilityBuilder } from '@casl/ability'
import { abilitiesPlugin } from '@casl/vue'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { can, rules, build } = new AbilityBuilder(PureAbility)
  
  // Initial empty ability
  const ability = build()

  nuxtApp.vueApp.use(abilitiesPlugin, ability, {
    useGlobalProperties: true
  })

  // Initialize ability from cookie if user data exists
  const user = useCookie<any>('user_data')
  if (user.value && user.value.abilities) {
    ability.update(user.value.abilities)
  }

  return {
    provide: {
      ability
    }
  }
})
