import { render, screen } from "@testing-library/react";
import { Hero } from "../hero";

describe("Hero", () => {
  it("renders hero section with all elements", () => {
    render(<Hero />);

    // Vérifie le titre principal
    expect(
      screen.getByText("Vivez plus longtemps en pleine santé")
    ).toBeInTheDocument();

    // Vérifie les boutons CTA
    expect(screen.getByText("Obtenir mon guide gratuit")).toBeInTheDocument();
    expect(screen.getByText("Explorer les articles")).toBeInTheDocument();

    // Vérifie le badge
    expect(screen.getByText("+50,000 lecteurs satisfaits")).toBeInTheDocument();

    // Vérifie la présence de l'image
    const heroImage = screen.getByAltText("Santé et longévité");
    expect(heroImage).toBeInTheDocument();
  });
});
