import { Card, CardContent } from "./ui/card"

const Footer = () => {
    return (
        <footer>
          <Card className="py-6 px-5">
            <CardContent>
              <p className="text-sm text-gray-400">© {new Date().getFullYear()} Copyright <span className="font-bold">FSW Barber</span>.</p>
            </CardContent>
          </Card>
        </footer>
    )
}

export default Footer;