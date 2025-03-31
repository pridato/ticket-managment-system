
import { useState } from "react"
import { Button } from "@/components/ui/button"
import LoginDialog from "@/components/auth/LoginDialog"
import RegisterDialog from "@/components/auth/RegisterDialog"

/**
 * Componente AuthButtons
 *
 * Este componente renderiza dos botones: "Login" y "Register". 
 * Al hacer clic en estos botones, se abren sus respectivos componentes de diálogo.
 *
 * @componente
 *
 * @returns {JSX.Element} Un componente de React que muestra los botones de login y registro con sus respectivos diálogos.
 *
 */
export default function AuthButtons() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  return (
    <div className="flex gap-2">
      <Button className="bg-emerald-700 hover:bg-emerald-900 text-white cursor-pointer" onClick={() => setLoginOpen(true)}>
        Login
      </Button>
      <Button className="text-emerald-700 dark:text-emerald-400 bg-gray-200 hover:bg-gray-300 cursor-pointer" onClick={() => setRegisterOpen(true)}>
        Register
      </Button>

      <LoginDialog isOpen={loginOpen} onOpenChange={setLoginOpen} onRegisterOpen={setRegisterOpen}/>
      <RegisterDialog isOpen={registerOpen} onOpenChange={setRegisterOpen} onLoginOpen={setLoginOpen} />
    </div>
  )
}
