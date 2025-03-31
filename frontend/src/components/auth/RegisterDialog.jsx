
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { UserIcon, MailIcon, LockIcon } from "lucide-react"

/**
 * Componente de diálogo para el registro de usuarios.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el diálogo está abierto.
 * @param {Function} props.onOpenChange - Función para manejar el cambio de estado del diálogo.
 * @param {Function} props.onLoginOpen - Función para abrir el diálogo de inicio de sesión.
 * 
 * @description
 * Este componente muestra un formulario de registro en un cuadro de diálogo. 
 * Permite a los usuarios ingresar su información personal, como nombre, apellido, correo electrónico y contraseña.
 * También incluye validación para asegurar que las contraseñas coincidan antes de enviar el formulario.
 * 
 */
export default function RegisterDialog({ isOpen, onOpenChange, onLoginOpen }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [isLoading, setIsLoading] = useState(false)

    /**
     * Maneja los cambios en los campos de entrada del formulario.
     * Actualiza el estado del formulario con el nuevo valor del campo modificado.
     *
     * @param {Object} e - El evento de cambio del campo de entrada.
     * @param {string} e.target.id - El identificador del campo de entrada.
     * @param {string} e.target.value - El valor actual del campo de entrada.
     */
    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    /**
     * Maneja el envío del formulario de registro.
     * 
     * @async
     * @function handleSubmit
     * @param {Object} e - El evento de envío del formulario.
     * @returns {void}
     * 
     * @description
     * Este método valida que las contraseñas coincidan antes de proceder con el registro.
     * Si las contraseñas no coinciden, muestra un mensaje de error. Si la validación es exitosa,
     * simula un retraso de 1 segundo para el registro, muestra un mensaje de éxito y reinicia
     * los datos del formulario. En caso de error durante el registro, muestra un mensaje de error.
     * Finalmente, asegura que el estado de carga se restablezca.
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast.error("Las contraseñas no coinciden")
            return
        }

        setIsLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast.success("Registro exitoso")
            onOpenChange(false)
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
        } catch (error) {
            toast.error("Error al registrar usuario")
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * Maneja la apertura del diálogo de inicio de sesión.
     * Cierra el diálogo actual y abre el diálogo de inicio de sesión.
     *
     * @function handleLoginOpen
     */
    const handleLoginOpen = () => {
        onOpenChange(false)
        onLoginOpen(true)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                {/* Header */}
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Crear Cuenta</DialogTitle>
                    <DialogDescription>Completa el formulario para registrarte en el sistema</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    {/* Nombre y Apellido */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Nombre  */}
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Nombre</Label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="firstName"
                                    placeholder="Juan"
                                    className="pl-10"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Apellido */}
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Apellido</Label>
                            <Input id="lastName" placeholder="Pérez" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <div className="relative">
                            <MailIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="nombre@ejemplo.com"
                                className="pl-10"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Términos y condiciones */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            className="h-4 w-4 rounded border border-input bg-background text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            required
                        />
                        <Label htmlFor="terms" className="text-sm">
                            Acepto los{" "}
                            <a href="#" className="text-primary hover:underline">
                                términos y condiciones
                            </a>
                        </Label>
                    </div>


                    {/* Submit Button */}
                    <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800" disabled={isLoading}>
                            {isLoading ? "Registrando..." : "Crear Cuenta"}
                        </Button>
                    </DialogFooter>
                </form>

                {/* Footer Iniciar sesion */}
                <div className="text-center text-sm">
                    ¿Ya tienes una cuenta?{" "}
                    <button onClick={handleLoginOpen} className="text-primary font-medium hover:underline cursor-pointer">
                        Inicia sesión
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

