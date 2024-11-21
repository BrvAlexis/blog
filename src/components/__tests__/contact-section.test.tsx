import { render, screen, fireEvent } from "@testing-library/react";
import { ContactSection } from "../contact-section";
import userEvent from "@testing-library/user-event";

describe("ContactSection", () => {
  it("renders contact form and social links", () => {
    render(<ContactSection />);

    // Vérifie les éléments principaux
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();

    // Vérifie les boutons sociaux
    expect(screen.getAllByRole("button")).toHaveLength(4); // 3 social + 1 submit
  });

  it("validates form inputs correctly", async () => {
    render(<ContactSection />);

    const submitButton = screen.getByText(/envoyer le message/i);

    // Soumission avec champs vides
    fireEvent.click(submitButton);
    expect(await screen.findByText(/nom.*2 caractères/i)).toBeInTheDocument();

    // Test avec email invalide
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, "invalid-email");
    fireEvent.click(submitButton);
    expect(await screen.findByText(/email valide/i)).toBeInTheDocument();
  });
});
