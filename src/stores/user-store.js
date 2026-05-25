import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'

export const useUserStore = defineStore('User', () => {
  const token = ref(null)
  const expiresIn = ref(null)



  // en esta funcion de access, enviamos las credenciales al servidor de api rest, y si son correctas, nos envia el token y....
  // ...la expiracion que se guardan en las variables reactivas token y expiresIn
  const access = async () => {
    try {
      const res = await api.post('/auth/login', {
        email: 'tono@alumno.com',
        password: '123123',
      })
      token.value = res.data.token
      expiresIn.value = res.data.expiresIn
      setTime()
    } catch (error) {
      console.log(error)
    }
  }




  // para cerrar sesion
  const logout = async () => {
    try {
      await api.get('/auth/logout')
    } catch (error) {
      console.log(error)
    }finally{
     resetStore()
    }
  }



  // para refrescar el token automaticamente, antes que llegue al termino de los 15 minutos y de esa manera el usuario siga en la pagina sin logearse
  const setTime = () => {
    setTimeout(
      () => {
        console.log('se refresco')
        refreshToken()
      },
      expiresIn.value * 1000 - 6000,
    )
  }




  // aca con esta funcion  se refresca el token, y por ende se amplia la permanencia en la pagina, siempre y cuando el refresco del token este dentro de los 15 minutos y no haya expirado.
  // asi se evita que el usuario tenga que ingresar sus credenciales cada 15 minutos.
  // el refresh token sirve para persistir el usuario
  const refreshToken = async () => {
    try {
      const res = await api.get('/auth/refresh')
      token.value = res.data.token
      expiresIn.value = res.data.expiresIn
      setTime()
    } catch (error) {
      console.log(error)
    }
  }

// aca se para dejar en blanco el token y la expiracion cuando se haga logout o cierre de sesion
const resetStore = () => {
  token.value = null;
  expiresIn.value = null;
}


  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout,
  }
})
