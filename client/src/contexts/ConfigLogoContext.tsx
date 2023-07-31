import React, { createContext, useEffect, useState } from "react";
import { createConfigLogo, getConfigLogo } from "../services/httpClient";
import { useAuth } from "../hooks"; // Assuming you have an AuthContext to get the accessToken
import toast from "react-hot-toast";

export interface ILogo {
  href: string;
  logo: string;
}

export interface ConfigLogoContextType {
  configLogo: ILogo;
  setConfigLogo: React.Dispatch<React.SetStateAction<ILogo>>;
  setLogo: React.Dispatch<React.SetStateAction<File | null>>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitConfigLogo: (event: React.FormEvent) => Promise<void>;
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  href: string;
}

const initialConfigLogoContext: ConfigLogoContextType = {
  configLogo: { href: "", logo: "" },
  setConfigLogo: () => {
    throw new Error("setConfigLogo is not implemented");
  },
  setLogo: () => {
    throw new Error("setLogo is not implemented");
  },
  handleInputChange: () => {
    throw new Error("handleInputChange is not implemented");
  },
  handleImageUpload: () => {
    throw new Error("handleImageUpload is not implemented");
  },
  submitConfigLogo: () => {
    throw new Error("submitConfigLogo is not implemented");
  },
  selectedImage: null,
  setSelectedImage: () => {
    throw new Error("setSelectedImage is not implemented");
  },
  href: "",
};

export const ConfigLogoContext = createContext<ConfigLogoContextType>(
  initialConfigLogoContext
);

interface ConfigLogoProviderProps {
  children: React.ReactNode;
}

export const ConfigLogoProvider = ({ children }: ConfigLogoProviderProps) => {
  const { accessToken } = useAuth();
  const [configLogo, setConfigLogo] = useState<ILogo>({
    href: "/",
    logo: "",
  });
  const [href, setHref] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHref(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
      setLogo(file);
    }
  };

  const submitConfigLogo = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the form
    if (!href || !logo) {
      toast.error("Please fill in all the required fields.", {
        duration: 2500,
      });
      return;
    }

    if (accessToken) {
      const formData = new FormData();

      formData.append("href", href);
      if (logo) {
        formData.append("logo", logo);
      }

      try {
        const res = await createConfigLogo(formData, accessToken);

        if (!res?.status) return;
        setConfigLogo(res.data.result);

        toast.success("Create successfully", { duration: 1500 });

        setTimeout(() => {
          setHref("");
          setLogo(null);
          setSelectedImage(null);
        }, 1500);
      } catch (error) {
        console.error("Error creating blog:", error);
      }
    }
  };

  const fetchLogo = async () => {
    const res = await getConfigLogo();

    setConfigLogo(res.result);
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  return (
    <ConfigLogoContext.Provider
      value={{
        configLogo,
        setConfigLogo,
        setLogo,
        selectedImage,
        setSelectedImage,
        submitConfigLogo,
        handleInputChange,
        handleImageUpload,
        href,
      }}
    >
      {children}
    </ConfigLogoContext.Provider>
  );
};
