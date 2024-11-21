import { renderHook, act } from "@testing-library/react";
import { useAuth } from "../useAuth";
import { auth } from "@/firebase/configFirebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock firebase/auth
jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  signInWithPopup: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null);
    return jest.fn();
  }),
}));

describe("useAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should handle Google sign in success", async () => {
    const mockUser = {
      displayName: "Test User",
      email: "test@example.com",
      photoURL: "https://example.com/photo.jpg",
    };

    (signInWithPopup as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signInWithGoogle();
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  test("should handle email sign in success", async () => {
    const mockUser = {
      email: "test@example.com",
      password: "password123",
    };

    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signInWithEmail("test@example.com", "password123");
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  test("should handle sign in error", async () => {
    const mockError = new Error("Auth error");
    (signInWithPopup as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signInWithGoogle();
    });

    expect(result.current.error).toBe(mockError.message);
    expect(result.current.user).toBeNull();
  });

  test("should handle sign out", async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
