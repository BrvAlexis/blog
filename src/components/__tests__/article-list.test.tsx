import { render, screen } from "@testing-library/react";
import { ArticleList } from "../article-list";
import { collection, onSnapshot } from "firebase/firestore";
import { FirebaseContext } from "@/app/context/articleContext";

// Mock Firebase
jest.mock("@/firebase/configFirebase", () => ({
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn(),
}));

describe("ArticleList", () => {
  const mockArticles = [
    {
      id: "1",
      title: "Test Article",
      description: "Test Description",
      image: "/test.jpg",
      category: "Santé",
      authorName: "John Doe",
      authorId: "test-author-id",
      createdAt: "2024-01-01",
    },
  ];

  // Wrapper le composant avec le contexte
  const renderWithContext = (component: React.ReactNode) => {
    return render(
      <FirebaseContext.Provider
        value={{
          articles: mockArticles,
          addArticle: jest.fn(),
          deleteArticle: jest.fn(),
        }}
      >
        {component}
      </FirebaseContext.Provider>
    );
  };

  beforeEach(() => {
    (onSnapshot as jest.Mock).mockImplementation((query, callback) => {
      callback({
        forEach: (fn: (doc: any) => void) => {
          mockArticles.forEach((article) => {
            fn({
              data: () => article,
              id: article.id,
            });
          });
        },
      });
      return () => {};
    });
  });

  it("renders loading state initially", () => {
    // Mock l'état de chargement initial
    (onSnapshot as jest.Mock).mockImplementation(() => {
      return () => {};
    });

    renderWithContext(<ArticleList />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders articles after loading", async () => {
    renderWithContext(<ArticleList />);

    const article = await screen.findByText("Test Article");
    expect(article).toBeInTheDocument();

    const authorElement = await screen.findByText((content) =>
      content.includes("John Doe")
    );
    expect(authorElement).toBeInTheDocument();
  });
});
