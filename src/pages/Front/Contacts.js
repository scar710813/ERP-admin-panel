import { Container } from "@mui/material"
import { useTranslation } from "react-i18next"
import ContactsHero from "../../components/hero/ContactsHero"
import useTitle from "../../hooks/useTitle"

const Contacts = () => {
  const { t } = useTranslation()

  useTitle(t("Contacts"))

  return (
    <Container maxWidth="lg" sx={{ pt: 6 }}>
      {/* Top sell */}
      {/* Category */}
      <ContactsHero />
    </Container>
  )
}
export default Contacts
