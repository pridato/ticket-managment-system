import { DialogDescription } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { MailIcon, LockIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { authService } from "@/services"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

/**
 * Componente de diálogo para iniciar sesión.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el diálogo está abierto.
 * @param {Function} props.onOpenChange - Función para manejar el cambio de estado del diálogo.
 * @param {Function} props.onRegisterOpen - Función para abrir el diálogo de registro.
 *
 * @returns {JSX.Element} - El componente de diálogo de inicio de sesión.
 *
 * @description
 * Este componente muestra un formulario de inicio de sesión dentro de un diálogo.
 * Permite al usuario ingresar su correo electrónico y contraseña, y manejar el envío
 * del formulario. También incluye opciones como "Recordarme" y enlaces para recuperar
 * la contraseña o registrarse.
 */
export default function LoginDialog({ isOpen, onOpenChange, onRegisterOpen }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    /**
     * Maneja el envío del formulario de registro.
     * 
     * @async
     * @function handleSubmit
     * @param {Object} e - El evento de envío del formulario.
     * @returns {Promise<void>} - Una promesa que se resuelve después de manejar el envío.
     * 
     * @description
     * Esta función se encarga de manejar el evento de envío del formulario. 
     * Previene el comportamiento predeterminado del formulario, muestra un indicador de carga,
     * simula un retraso de 1 segundo, y luego muestra un mensaje de éxito o error 
     * dependiendo del resultado. Finalmente, restablece el estado de carga y limpia los campos.
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await authService.login(email, password)

            if (response.status !== 200) {
                throw new Error("Error en la respuesta del servidor")
                
            }
            
            toast.success("Inicio de sesión exitoso", {
                description: "Bienvenido de nuevo",
                action: {
                    label: "Ver tickets",
                    onClick: () => console.log("Tickets")
                }
            });
            onOpenChange(false)
            setEmail("")
            setPassword("")
        } catch (error) {
            toast.error("Error al iniciar sesión", {
                description: "Credenciales incorrectas",
            })
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * Maneja el evento de clic para el registro.
     * Cierra el diálogo actual y abre el formulario de registro.
     *
     * @function handleRegisterClick
     */
    const handleRegisterClick = () => {
        onOpenChange(false)
        onRegisterOpen(true)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            
            <DialogContent className="sm:max-w-[425px]">
                {/* Header */}
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Iniciar Sesión</DialogTitle>
                    <DialogDescription>Ingresa tus credenciales para acceder al sistema de tickets</DialogDescription>
                </DialogHeader>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo Eléctronico</Label>
                        <div className="relative">
                            <MailIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="nombre@ejemplo.com"
                                className="pl-10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        {/* Label and link */}
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Contraseña</Label>
                            <a href="#" className="text-xs text-primary hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                        {/* Input */}
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Recordar */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="h-4 w-4 rounded border border-input bg-background text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                        <Label htmlFor="remember" className="text-sm">
                            Recordarme
                        </Label>
                    </div>

                    {/* Submit Button */}
                    <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800" disabled={isLoading}>
                            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                        </Button>
                    </DialogFooter>
                </form>

                {/* Footer */}
                <div className="text-center text-sm">
                    ¿No tienes una cuenta?{" "}
                    <button onClick={handleRegisterClick} className="text-primary font-medium hover:underline cursor-pointer">
                        Regístrate
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}