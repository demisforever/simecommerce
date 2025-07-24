// Instalar NextAuth v4 que es más estable
const { exec } = require("child_process")

console.log("Instalando NextAuth v4...")

exec("npm uninstall next-auth", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error desinstalando: ${error.message}`)
  }

  // Instalar NextAuth v4
  exec("npm install next-auth@4.24.7 @radix-ui/react-dropdown-menu bcryptjs", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error instalando: ${error.message}`)
      return
    }
    console.log("NextAuth v4 instalado correctamente")
    console.log(stdout)
  })
})

exec("npm install -D @types/bcryptjs", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error instalando tipos: ${error.message}`)
    return
  }
  console.log("Tipos instalados correctamente")
})
