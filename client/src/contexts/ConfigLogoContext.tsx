import React, { createContext, useEffect, useState } from "react";
import {
  createConfigSetting,
  getConfigSetting,
} from "../services/httpClientForAdmin";
import { useAuth } from "../hooks"; // Assuming you have an AuthContext to get the accessToken
import toast from "react-hot-toast";

export interface IConfigInput {
  footerText: string;
  href: string;
}

type ConfigSetting = {
  logo: string;
} & IConfigInput;

export interface ConfigLogoContextType {
  configSetting: ConfigSetting;
  configInput: IConfigInput;
  setConfigSetting: React.Dispatch<React.SetStateAction<ConfigSetting>>;
  setLogo: React.Dispatch<React.SetStateAction<File | null>>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitConfigSetting: (event: React.FormEvent) => Promise<void>;
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const initialConfigLogoContext: ConfigLogoContextType = {
  configInput: { href: "", footerText: "" },
  configSetting: { logo: "", href: "", footerText: "" },
  setConfigSetting: () => {
    throw new Error("setConfigSetting is not implemented");
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
  submitConfigSetting: () => {
    throw new Error("submitConfigSetting is not implemented");
  },
  selectedImage: null,
  setSelectedImage: () => {
    throw new Error("setSelectedImage is not implemented");
  },
};

export const ConfigLogoContext = createContext<ConfigLogoContextType>(
  initialConfigLogoContext
);

interface ConfigLogoProviderProps {
  children: React.ReactNode;
}

export const ConfigLogoProvider = ({ children }: ConfigLogoProviderProps) => {
  const { accessToken } = useAuth();
  const [configSetting, setConfigSetting] = useState<ConfigSetting>({
    logo: "",
    href: "",
    footerText: "",
  });
  const [configInput, setConfigInput] = useState<IConfigInput>({
    footerText: "",
    href: "",
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;

    setConfigInput({
      ...configInput,
      [name]: event.target.value,
    });
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

  const submitConfigSetting = async (event: React.FormEvent) => {
    event.preventDefault();

    const { footerText, href } = configInput;

    // Validate the form
    if (!href || !logo || !footerText) {
      toast.error("Please fill in all the required fields.", {
        duration: 2500,
      });
      return;
    }

    if (accessToken) {
      const formData = new FormData();

      formData.append("footerText", footerText);
      formData.append("href", href);
      if (logo) {
        formData.append("logo", logo);
      }

      try {
        const res = await createConfigSetting(formData, accessToken);

        if (!res?.status) return;
        setConfigSetting(res.data.result);

        toast.success("Create successfully", { duration: 1500 });

        setTimeout(() => {
          setConfigInput({ footerText: "", href: "" });
          setLogo(null);
          setSelectedImage(null);
        }, 1500);
      } catch (error) {
        console.error("Error creating blog:", error);
      }
    }
  };

  const fetchLogo = async () => {
    const res = await getConfigSetting();

    setConfigSetting(res.result);
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  return (
    <ConfigLogoContext.Provider
      value={{
        configInput,
        configSetting,
        setConfigSetting,
        setLogo,
        selectedImage,
        setSelectedImage,
        submitConfigSetting,
        handleInputChange,
        handleImageUpload,
      }}
    >
      {children}
    </ConfigLogoContext.Provider>
  );
};
