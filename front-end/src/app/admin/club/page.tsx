"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Activity {
  imageUrl: string;
  title: string;
  description: string;
}

interface ClubType {
  imageUrl: string;
  title: string;
  description: string;
}

interface Award {
  imageUrl: string;
  title: string;
  description: string;
}

export default function AdminClubPage() {
  const [heroBackgroundImage, setHeroBackgroundImage] = useState<File | null>(
    null
  );
  const [clubLogo, setClubLogo] = useState<File | null>(null);
  const [previewHeroBg, setPreviewHeroBg] = useState<string>("/about3.png");
  const [previewLogo, setPreviewLogo] = useState<string>("/logosalbariin.png");
  const [motto, setMotto] = useState<string>("");
  const [mission, setMission] = useState<string>("");
  const [athletesCount, setAthletesCount] = useState<string>("");
  const [typesCount, setTypesCount] = useState<string>("");
  const [coachesCount, setCoachesCount] = useState<string>("");
  const [tournamentTitle, setTournamentTitle] = useState<string>("");
  const [tournamentDescription, setTournamentDescription] =
    useState<string>("");
  const [tournamentName, setTournamentName] = useState<string>("");
  const [tournamentFrequency, setTournamentFrequency] = useState<string>("");
  const [tournamentParticipants, setTournamentParticipants] =
    useState<string>("");
  const [tournamentDetails, setTournamentDetails] = useState<string>("");
  const [tournamentButtonText, setTournamentButtonText] = useState<string>("");
  const [activitiesTitle, setActivitiesTitle] = useState<string>("");
  const [activities, setActivities] = useState<Activity[]>([
    {
      imageUrl: "/about3.png",
      title: "Сэтгэхүйн тэмцээн",
      description:
        "Оюуны спортын төрөл бүрийн тэмцээнүүдийг зохион байгуулж, сурагчдын сэтгэхүй, хурд, багаар ажиллах чадварыг хөгжүүлэх.",
    },
    {
      imageUrl: "/academy.png",
      title: "Сургалт, семинар",
      description:
        "Оюуны спортын талаарх мэргэжлийн сургалт, семинаруудыг зохион байгуулж, сурагчдын мэдлэг, урлагийг дээшлүүлэх.",
    },
    {
      imageUrl: "/xyno.jpg",
      title: "Хамтын ажиллагаа",
      description:
        "Бусад сургуулиуд, байгууллагуудтай хамтран оюуны спортын соёлыг түгээн дэлгэрүүлэх, хамтын ажиллагааг хөгжүүлэх.",
    },
  ]);
  const [typesTitle, setTypesTitle] = useState<string>("");
  const [types, setTypes] = useState<ClubType[]>([
    {
      imageUrl: "/logo.svg",
      title: "ТҮРГЭН БОДОЛТ",
      description: "Санах ойг хөгжүүлэх дасгал, тэмцээн, сургалт.",
    },
    {
      imageUrl: "/logo.svg",
      title: "ОЙ ТОГТООЛТ",
      description: "Судоку болон логик бодлого бодох клуб.",
    },
    {
      imageUrl: "/logo.svg",
      title: "СПОРТ ӨРӨЛТ",
      description: "Шатрын сургалт, тэмцээн, клубийн үйл ажиллагаа.",
    },
    {
      imageUrl: "/logo.svg",
      title: "РУБИКИЙН ШОО",
      description: "Рубикийн шооны хурд, техник, тэмцээн.",
    },
    {
      imageUrl: "/logo.svg",
      title: "МАТЕМАТИК",
      description: "Математикийн олимпиад, бодлого бодох клуб.",
    },
    {
      imageUrl: "/logo.svg",
      title: "СЭТГЭХҮЙ",
      description: "Сэтгэхүйн хурд, бүтээлч сэтгэлгээ хөгжүүлэх клуб.",
    },
  ]);
  const [membershipTitle, setMembershipTitle] = useState<string>("");
  const [membershipDescription, setMembershipDescription] =
    useState<string>("");
  const [membershipRequirements, setMembershipRequirements] = useState<
    string[]
  >([
    "8-18 насны сурагч байх",
    "Оюуны спорт, сэтгэхүйн тоглоомд сонирхолтой байх",
    "Багаар ажиллах, хамт олны уур амьсгалыг дэмжих хүсэлтэй байх",
    "Сургалт, тэмцээнд идэвхтэй оролцох",
  ]);
  const [registerButtonText, setRegisterButtonText] = useState<string>("");
  const [googleFormLink, setGoogleFormLink] = useState<string>("");
  const [internationalAwardsTitle, setInternationalAwardsTitle] =
    useState<string>("");
  const [internationalAwards, setInternationalAwards] = useState<Award[]>([
    {
      imageUrl: "/about3.png",
      title: "World Memory Championship",
      description: "2023 онд 2-р байр",
    },
    {
      imageUrl: "/academy.png",
      title: "Asian Puzzle Cup",
      description: "2022 онд 1-р байр",
    },
  ]);
  const [domesticAwardsTitle, setDomesticAwardsTitle] = useState<string>("");
  const [domesticAwards, setDomesticAwards] = useState<Award[]>([
    {
      imageUrl: "/xyno.jpg",
      title: "Монголын Оюуны Спортын Олимпиад",
      description: "2023 онд 1-р байр",
    },
    {
      imageUrl: "/logosalbariin.png",
      title: "Улсын аварга тэмцээн",
      description: "2022 онд 2-р байр",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string>("");

  // Fetch current club content on component mount
  useEffect(() => {
    const fetchClubContent = async () => {
      try {
        const response = await fetch("/api/club");
        if (!response.ok) {
          throw new Error("Failed to fetch club content");
        }
        const data = await response.json();

        if (data.success && data.data) {
          setPreviewHeroBg(data.data.heroBackgroundImage || "/about3.png");
          setPreviewLogo(data.data.clubLogo || "/logosalbariin.png");
          setMotto(data.data.motto || "");
          setMission(data.data.mission || "");
          setAthletesCount(data.data.athletesCount || "");
          setTypesCount(data.data.typesCount || "");
          setCoachesCount(data.data.coachesCount || "");
          setTournamentTitle(data.data.tournamentTitle || "");
          setTournamentDescription(data.data.tournamentDescription || "");
          setTournamentName(data.data.tournamentName || "");
          setTournamentFrequency(data.data.tournamentFrequency || "");
          setTournamentParticipants(data.data.tournamentParticipants || "");
          setTournamentDetails(data.data.tournamentDetails || "");
          setTournamentButtonText(data.data.tournamentButtonText || "");
          setActivitiesTitle(data.data.activitiesTitle || "");
          setActivities(
            data.data.activities || [
              {
                imageUrl: "/about3.png",
                title: "Сэтгэхүйн тэмцээн",
                description:
                  "Оюуны спортын төрөл бүрийн тэмцээнүүдийг зохион байгуулж, сурагчдын сэтгэхүй, хурд, багаар ажиллах чадварыг хөгжүүлэх.",
              },
              {
                imageUrl: "/academy.png",
                title: "Сургалт, семинар",
                description:
                  "Оюуны спортын талаарх мэргэжлийн сургалт, семинаруудыг зохион байгуулж, сурагчдын мэдлэг, урлагийг дээшлүүлэх.",
              },
              {
                imageUrl: "/xyno.jpg",
                title: "Хамтын ажиллагаа",
                description:
                  "Бусад сургуулиуд, байгууллагуудтай хамтран оюуны спортын соёлыг түгээн дэлгэрүүлэх, хамтын ажиллагааг хөгжүүлэх.",
              },
            ]
          );
          setTypesTitle(data.data.typesTitle || "");
          setTypes(
            data.data.types || [
              {
                imageUrl: "/logo.svg",
                title: "ТҮРГЭН БОДОЛТ",
                description: "Санах ойг хөгжүүлэх дасгал, тэмцээн, сургалт.",
              },
              {
                imageUrl: "/logo.svg",
                title: "ОЙ ТОГТООЛТ",
                description: "Судоку болон логик бодлого бодох клуб.",
              },
              {
                imageUrl: "/logo.svg",
                title: "СПОРТ ӨРӨЛТ",
                description: "Шатрын сургалт, тэмцээн, клубийн үйл ажиллагаа.",
              },
              {
                imageUrl: "/logo.svg",
                title: "РУБИКИЙН ШОО",
                description: "Рубикийн шооны хурд, техник, тэмцээн.",
              },
              {
                imageUrl: "/logo.svg",
                title: "МАТЕМАТИК",
                description: "Математикийн олимпиад, бодлого бодох клуб.",
              },
              {
                imageUrl: "/logo.svg",
                title: "СЭТГЭХҮЙ",
                description:
                  "Сэтгэхүйн хурд, бүтээлч сэтгэлгээ хөгжүүлэх клуб.",
              },
            ]
          );
          setMembershipTitle(data.data.membershipTitle || "");
          setMembershipDescription(data.data.membershipDescription || "");
          setMembershipRequirements(
            data.data.membershipRequirements || [
              "8-18 насны сурагч байх",
              "Оюуны спорт, сэтгэхүйн тоглоомд сонирхолтой байх",
              "Багаар ажиллах, хамт олны уур амьсгалыг дэмжих хүсэлтэй байх",
              "Сургалт, тэмцээнд идэвхтэй оролцох",
            ]
          );
          setRegisterButtonText(data.data.registerButtonText || "");
          setGoogleFormLink(data.data.googleFormLink || "");
          setInternationalAwardsTitle(data.data.internationalAwardsTitle || "");
          setInternationalAwards(
            data.data.internationalAwards || [
              {
                imageUrl: "/about3.png",
                title: "World Memory Championship",
                description: "2023 онд 2-р байр",
              },
              {
                imageUrl: "/academy.png",
                title: "Asian Puzzle Cup",
                description: "2022 онд 1-р байр",
              },
            ]
          );
          setDomesticAwardsTitle(data.data.domesticAwardsTitle || "");
          setDomesticAwards(
            data.data.domesticAwards || [
              {
                imageUrl: "/xyno.jpg",
                title: "Монголын Оюуны Спортын Олимпиад",
                description: "2023 онд 1-р байр",
              },
              {
                imageUrl: "/logosalbariin.png",
                title: "Улсын аварга тэмцээн",
                description: "2022 онд 2-р байр",
              },
            ]
          );
        }
      } catch (err) {
        console.error("Error fetching club content:", err);
        setError("Failed to load club content");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchClubContent();
  }, []);

  const handleHeroBackgroundChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroBackgroundImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewHeroBg(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClubLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setClubLogo(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleActivityChange = (
    index: number,
    field: keyof Activity,
    value: string
  ) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = { ...updatedActivities[index], [field]: value };
    setActivities(updatedActivities);
  };

  const addActivity = () => {
    setActivities([
      ...activities,
      {
        imageUrl: "/logo.svg",
        title: "Шинэ үйл ажиллагаа",
        description: "Үйл ажиллагааны тайлбар",
      },
    ]);
  };

  const removeActivity = (index: number) => {
    if (activities.length > 1) {
      const updatedActivities = activities.filter((_, i) => i !== index);
      setActivities(updatedActivities);
    }
  };

  const handleTypeChange = (
    index: number,
    field: keyof ClubType,
    value: string
  ) => {
    const updatedTypes = [...types];
    updatedTypes[index] = { ...updatedTypes[index], [field]: value };
    setTypes(updatedTypes);
  };

  const addType = () => {
    setTypes([
      ...types,
      {
        imageUrl: "/logo.svg",
        title: "Шинэ төрөл",
        description: "Төрлийн тайлбар",
      },
    ]);
  };

  const removeType = (index: number) => {
    if (types.length > 1) {
      const updatedTypes = types.filter((_, i) => i !== index);
      setTypes(updatedTypes);
    }
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...membershipRequirements];
    updatedRequirements[index] = value;
    setMembershipRequirements(updatedRequirements);
  };

  const addRequirement = () => {
    setMembershipRequirements([...membershipRequirements, "Шинэ шаардлага"]);
  };

  const removeRequirement = (index: number) => {
    if (membershipRequirements.length > 1) {
      const updatedRequirements = membershipRequirements.filter(
        (_, i) => i !== index
      );
      setMembershipRequirements(updatedRequirements);
    }
  };

  const handleInternationalAwardChange = (
    index: number,
    field: keyof Award,
    value: string
  ) => {
    const updatedAwards = [...internationalAwards];
    updatedAwards[index] = { ...updatedAwards[index], [field]: value };
    setInternationalAwards(updatedAwards);
  };

  const addInternationalAward = () => {
    setInternationalAwards([
      ...internationalAwards,
      {
        imageUrl: "/logo.svg",
        title: "Шинэ олон улсын шагнал",
        description: "Шагналын тайлбар",
      },
    ]);
  };

  const removeInternationalAward = (index: number) => {
    if (internationalAwards.length > 1) {
      const updatedAwards = internationalAwards.filter((_, i) => i !== index);
      setInternationalAwards(updatedAwards);
    }
  };

  const handleDomesticAwardChange = (
    index: number,
    field: keyof Award,
    value: string
  ) => {
    const updatedAwards = [...domesticAwards];
    updatedAwards[index] = { ...updatedAwards[index], [field]: value };
    setDomesticAwards(updatedAwards);
  };

  const addDomesticAward = () => {
    setDomesticAwards([
      ...domesticAwards,
      {
        imageUrl: "/logo.svg",
        title: "Шинэ дотоодын шагнал",
        description: "Шагналын тайлбар",
      },
    ]);
  };

  const removeDomesticAward = (index: number) => {
    if (domesticAwards.length > 1) {
      const updatedAwards = domesticAwards.filter((_, i) => i !== index);
      setDomesticAwards(updatedAwards);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // For now, we'll use the preview URLs as the actual URLs
      // In a real implementation, you would upload the files to a storage service
      const updateData: any = {};

      if (heroBackgroundImage) {
        // In a real app, upload the file and get the URL
        updateData.heroBackgroundImage = previewHeroBg;
      }

      if (clubLogo) {
        // In a real app, upload the file and get the URL
        updateData.clubLogo = previewLogo;
      }

      if (motto.trim()) {
        updateData.motto = motto.trim();
      }

      if (mission.trim()) {
        updateData.mission = mission.trim();
      }

      if (athletesCount.trim()) {
        updateData.athletesCount = athletesCount.trim();
      }

      if (typesCount.trim()) {
        updateData.typesCount = typesCount.trim();
      }

      if (coachesCount.trim()) {
        updateData.coachesCount = coachesCount.trim();
      }

      if (tournamentTitle.trim()) {
        updateData.tournamentTitle = tournamentTitle.trim();
      }

      if (tournamentDescription.trim()) {
        updateData.tournamentDescription = tournamentDescription.trim();
      }

      if (tournamentName.trim()) {
        updateData.tournamentName = tournamentName.trim();
      }

      if (tournamentFrequency.trim()) {
        updateData.tournamentFrequency = tournamentFrequency.trim();
      }

      if (tournamentParticipants.trim()) {
        updateData.tournamentParticipants = tournamentParticipants.trim();
      }

      if (tournamentDetails.trim()) {
        updateData.tournamentDetails = tournamentDetails.trim();
      }

      if (tournamentButtonText.trim()) {
        updateData.tournamentButtonText = tournamentButtonText.trim();
      }

      if (activitiesTitle.trim()) {
        updateData.activitiesTitle = activitiesTitle.trim();
      }

      if (activities.length > 0) {
        updateData.activities = activities;
      }

      if (typesTitle.trim()) {
        updateData.typesTitle = typesTitle.trim();
      }

      if (types.length > 0) {
        updateData.types = types;
      }

      if (membershipTitle.trim()) {
        updateData.membershipTitle = membershipTitle.trim();
      }

      if (membershipDescription.trim()) {
        updateData.membershipDescription = membershipDescription.trim();
      }

      if (membershipRequirements.length > 0) {
        updateData.membershipRequirements = membershipRequirements;
      }

      if (registerButtonText.trim()) {
        updateData.registerButtonText = registerButtonText.trim();
      }

      if (googleFormLink.trim()) {
        updateData.googleFormLink = googleFormLink.trim();
      }

      if (internationalAwardsTitle.trim()) {
        updateData.internationalAwardsTitle = internationalAwardsTitle.trim();
      }

      if (internationalAwards.length > 0) {
        updateData.internationalAwards = internationalAwards;
      }

      if (domesticAwardsTitle.trim()) {
        updateData.domesticAwardsTitle = domesticAwardsTitle.trim();
      }

      if (domesticAwards.length > 0) {
        updateData.domesticAwards = domesticAwards;
      }

      if (Object.keys(updateData).length === 0) {
        setError("Please make at least one change to save");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch("/api/club", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update club content");
      }

      const data = await response.json();

      if (data.success) {
        alert("Клуб хуудас амжилттай шинэчлэгдлээ!");
        // Clear the file inputs
        setHeroBackgroundImage(null);
        setClubLogo(null);
      } else {
        throw new Error(data.message || "Failed to update club content");
      }
    } catch (error) {
      console.error("Error updating club page:", error);
      setError(
        error instanceof Error ? error.message : "Error updating club page"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Уншиж байна...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Клуб хуудасны удирдлага
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Background Image Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Hero хэсгийн background зураг
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Шинэ зураг сонгох
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroBackgroundChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Зөвхөн JPG, PNG, GIF зургууд. Хамгийн их 5MB.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Одоогийн зураг
                </label>
                <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={previewHeroBg}
                    alt="Hero Background Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Club Logo Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Клубын лого
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Шинэ лого сонгох
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleClubLogoChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Зөвхөн JPG, PNG, SVG зургууд. Хамгийн их 2MB.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Одоогийн лого
                </label>
                <div className="relative w-32 h-32 bg-white rounded-lg overflow-hidden border-2 border-gray-200">
                  <Image
                    src={previewLogo}
                    alt="Club Logo Preview"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Motto Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              КЛУБИЙН УРИА
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Клубын уриа
              </label>
              <textarea
                value={motto}
                onChange={(e) => setMotto(e.target.value)}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Оюун ухаанаа хөгжүүлж, ирээдүйгээ бүтээе!"
              />
              <p className="text-xs text-gray-500 mt-1">Клубын урианы текст</p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              КЛУБИЙН ЗОРИЛГО
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Клубын зорилго
              </label>
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Сурагчдын сэтгэхүй, бүтээлч байдал, хамтын ажиллагааг хөгжүүлэх, оюуны спортын соёлыг түгээн дэлгэрүүлэх."
              />
              <p className="text-xs text-gray-500 mt-1">
                Клубын зорилгын дэлгэрэнгүй тайлбар
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              СТАТИСТИК МЭДЭЭЛЭЛ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тамирчдын тоо
                </label>
                <input
                  type="text"
                  value={athletesCount}
                  onChange={(e) => setAthletesCount(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="100+"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Жишээ: 100+, 150, 200+
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Төрлийн тоо
                </label>
                <input
                  type="text"
                  value={typesCount}
                  onChange={(e) => setTypesCount(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="6"
                />
                <p className="text-xs text-gray-500 mt-1">Жишээ: 6, 8, 10</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дасгалжуулагчдын тоо
                </label>
                <input
                  type="text"
                  value={coachesCount}
                  onChange={(e) => setCoachesCount(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="6+"
                />
                <p className="text-xs text-gray-500 mt-1">Жишээ: 6+, 8, 10+</p>
              </div>
            </div>
          </div>

          {/* Tournament Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              КЛУБИЙН НЭРЭМЖИТ ТЭМЦЭЭНҮҮД
            </h2>

            <div className="space-y-6">
              {/* Tournament Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Хэсгийн гарчиг
                </label>
                <input
                  type="text"
                  value={tournamentTitle}
                  onChange={(e) => setTournamentTitle(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="КЛУБИЙН НЭРЭМЖИТ ТЭМЦЭЭНҮҮД"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Тэмцээний хэсгийн үндсэн гарчиг
                </p>
              </div>

              {/* Tournament Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Хэсгийн тайлбар
                </label>
                <textarea
                  value={tournamentDescription}
                  onChange={(e) => setTournamentDescription(e.target.value)}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Манай клубийн нэрэмжит оюуны спортын тэмцээнүүдийг жил бүр тогтмол зохион байгуулдаг..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Тэмцээний хэсгийн ерөнхий тайлбар
                </p>
              </div>

              {/* Tournament Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тэмцээний нэр
                  </label>
                  <input
                    type="text"
                    value={tournamentName}
                    onChange={(e) => setTournamentName(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="RedS Open"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Жишээ: RedS Open, Memory Cup, Chess Championship
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Зохиогдох давтамж
                  </label>
                  <input
                    type="text"
                    value={tournamentFrequency}
                    onChange={(e) => setTournamentFrequency(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Жил бүр"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Жишээ: Жил бүр, 6 сар тутамд, Сар бүр
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Оролцогчид
                </label>
                <input
                  type="text"
                  value={tournamentParticipants}
                  onChange={(e) => setTournamentParticipants(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Клубийн гишүүд болон нийт сурагчид"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Тэмцээнд оролцох боломжтой хүмүүс
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Нэмэлт мэдээлэл
                </label>
                <textarea
                  value={tournamentDetails}
                  onChange={(e) => setTournamentDetails(e.target.value)}
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Тэмцээний талаарх дэлгэрэнгүй мэдээллийг манай мэдээ болон үйл ажиллагааны хэсгээс авна уу."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Тэмцээний талаарх нэмэлт мэдээлэл
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Товчны текст
                </label>
                <input
                  type="text"
                  value={tournamentButtonText}
                  onChange={(e) => setTournamentButtonText(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Тэмцээний мэдээлэл үзэх"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Тэмцээний хэсгийн товчны текст
                </p>
              </div>
            </div>
          </div>

          {/* Activities Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              КЛУБИЙН ҮЙЛ АЖИЛЛАГАА
            </h2>

            <div className="space-y-6">
              {/* Activities Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Хэсгийн гарчиг
                </label>
                <input
                  type="text"
                  value={activitiesTitle}
                  onChange={(e) => setActivitiesTitle(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="КЛУБИЙН ҮЙЛ АЖИЛЛАГАА"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Үйл ажиллагааны хэсгийн үндсэн гарчиг
                </p>
              </div>

              {/* Activities List */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Үйл ажиллагаанууд
                  </label>
                  <button
                    type="button"
                    onClick={addActivity}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    + Нэмэх
                  </button>
                </div>

                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-800">
                          Үйл ажиллагаа {index + 1}
                        </h4>
                        {activities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeActivity(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Устгах
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Зургийн URL
                          </label>
                          <input
                            type="text"
                            value={activity.imageUrl}
                            onChange={(e) =>
                              handleActivityChange(
                                index,
                                "imageUrl",
                                e.target.value
                              )
                            }
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="/about3.png"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Гарчиг
                          </label>
                          <input
                            type="text"
                            value={activity.title}
                            onChange={(e) =>
                              handleActivityChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="Сэтгэхүйн тэмцээн"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Тайлбар
                        </label>
                        <textarea
                          value={activity.description}
                          onChange={(e) =>
                            handleActivityChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Үйл ажиллагааны тайлбар..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Types Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              КЛУБИЙН ТӨРЛҮҮД
            </h2>

            <div className="space-y-6">
              {/* Types Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Хэсгийн гарчиг
                </label>
                <input
                  type="text"
                  value={typesTitle}
                  onChange={(e) => setTypesTitle(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="КЛУБИЙН ТӨРЛҮҮД"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Клубийн төрлүүдийн хэсгийн үндсэн гарчиг
                </p>
              </div>

              {/* Types List */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Клубийн төрлүүд
                  </label>
                  <button
                    type="button"
                    onClick={addType}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    + Нэмэх
                  </button>
                </div>

                <div className="space-y-4">
                  {types.map((type, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-800">
                          Төрөл {index + 1}
                        </h4>
                        {types.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeType(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Устгах
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Зургийн URL
                          </label>
                          <input
                            type="text"
                            value={type.imageUrl}
                            onChange={(e) =>
                              handleTypeChange(
                                index,
                                "imageUrl",
                                e.target.value
                              )
                            }
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="/logo.svg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Гарчиг
                          </label>
                          <input
                            type="text"
                            value={type.title}
                            onChange={(e) =>
                              handleTypeChange(index, "title", e.target.value)
                            }
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="ТҮРГЭН БОДОЛТ"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Тайлбар
                        </label>
                        <textarea
                          value={type.description}
                          onChange={(e) =>
                            handleTypeChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Төрлийн тайлбар..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Membership Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              КЛУБИЙН ГИШҮҮН БОЛОХ ШААРДЛАГА
            </h2>

            <div className="space-y-6">
              {/* Membership Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Хэсгийн гарчиг
                </label>
                <input
                  type="text"
                  value={membershipTitle}
                  onChange={(e) => setMembershipTitle(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="КЛУБИЙН ГИШҮҮН БОЛОХ ШААРДЛАГА"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Гишүүнчлэлийн хэсгийн үндсэн гарчиг
                </p>
              </div>

              {/* Membership Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тайлбар
                </label>
                <textarea
                  value={membershipDescription}
                  onChange={(e) => setMembershipDescription(e.target.value)}
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Манай клубт элсэхийг хүссэн сурагчид дараах шаардлагыг хангасан байх ёстой. Бид идэвхтэй, оюунлаг, хамт олонч залуусыг урьж байна!"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Гишүүнчлэлийн хэсгийн тайлбар
                </p>
              </div>

              {/* Requirements List */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Шаардлагууд
                  </label>
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    + Нэмэх
                  </button>
                </div>

                <div className="space-y-3">
                  {membershipRequirements.map((requirement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 border border-gray-200 rounded-lg p-3"
                    >
                      <span className="text-2xl">✔️</span>
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) =>
                          handleRequirementChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Шаардлага..."
                      />
                      {membershipRequirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Устгах
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Register Button Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Товчны текст
                </label>
                <input
                  type="text"
                  value={registerButtonText}
                  onChange={(e) => setRegisterButtonText(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Клубт элсэх"
                />
                <p className="text-xs text-gray-500 mt-1">Элсэх товчны текст</p>
              </div>

              {/* Google Form Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Form холбоос
                </label>
                <input
                  type="url"
                  value={googleFormLink}
                  onChange={(e) => setGoogleFormLink(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://forms.google.com/example-form-link"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Элсэх хүсэлтийн Google Form холбоос
                </p>
              </div>
            </div>
          </div>

          {/* International Awards Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ОЛОН УЛСЫН ШАГНАЛУУД
            </h2>

            <div className="space-y-6">
              {/* International Awards Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Хэсгийн гарчиг
                </label>
                <input
                  type="text"
                  value={internationalAwardsTitle}
                  onChange={(e) => setInternationalAwardsTitle(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ОЛОН УЛСЫН ШАГНАЛУУД"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Олон улсын шагналуудын хэсгийн үндсэн гарчиг
                </p>
              </div>

              {/* International Awards List */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Олон улсын шагналууд
                  </label>
                  <button
                    type="button"
                    onClick={addInternationalAward}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    + Нэмэх
                  </button>
                </div>

                <div className="space-y-4">
                  {internationalAwards.map((award, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-800">
                          Шагнал {index + 1}
                        </h4>
                        {internationalAwards.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInternationalAward(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Устгах
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Зургийн URL
                          </label>
                          <input
                            type="text"
                            value={award.imageUrl}
                            onChange={(e) =>
                              handleInternationalAwardChange(
                                index,
                                "imageUrl",
                                e.target.value
                              )
                            }
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="/about3.png"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Шагналын нэр
                          </label>
                          <input
                            type="text"
                            value={award.title}
                            onChange={(e) =>
                              handleInternationalAwardChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="World Memory Championship"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Тайлбар
                        </label>
                        <input
                          type="text"
                          value={award.description}
                          onChange={(e) =>
                            handleInternationalAwardChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="2023 онд 2-р байр"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Domestic Awards Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ДОТООДЫН ШАГНАЛУУД
            </h2>

            <div className="space-y-6">
              {/* Domestic Awards Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Хэсгийн гарчиг
                </label>
                <input
                  type="text"
                  value={domesticAwardsTitle}
                  onChange={(e) => setDomesticAwardsTitle(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ДОТООДЫН ШАГНАЛУУД"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Дотоодын шагналуудын хэсгийн үндсэн гарчиг
                </p>
              </div>

              {/* Domestic Awards List */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Дотоодын шагналууд
                  </label>
                  <button
                    type="button"
                    onClick={addDomesticAward}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    + Нэмэх
                  </button>
                </div>

                <div className="space-y-4">
                  {domesticAwards.map((award, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-800">
                          Шагнал {index + 1}
                        </h4>
                        {domesticAwards.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDomesticAward(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Устгах
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Зургийн URL
                          </label>
                          <input
                            type="text"
                            value={award.imageUrl}
                            onChange={(e) =>
                              handleDomesticAwardChange(
                                index,
                                "imageUrl",
                                e.target.value
                              )
                            }
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="/xyno.jpg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Шагналын нэр
                          </label>
                          <input
                            type="text"
                            value={award.title}
                            onChange={(e) =>
                              handleDomesticAwardChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="Монголын Оюуны Спортын Олимпиад"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Тайлбар
                        </label>
                        <input
                          type="text"
                          value={award.description}
                          onChange={(e) =>
                            handleDomesticAwardChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="2023 онд 1-р байр"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Урьдчилан харах
            </h2>

            <div className="space-y-8">
              {/* Hero Section Preview */}
              <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
                <Image
                  src={previewHeroBg}
                  alt="Hero Background"
                  fill
                  className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/10" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <Image
                        src={previewLogo}
                        alt="Club Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 drop-shadow-md">
                      RedS <span className="text-[#550080]">Клуб</span>
                    </h1>

                    {/* Preview Motto and Mission */}
                    <div className="mt-4 space-y-2">
                      {motto && (
                        <div>
                          <h3 className="text-sm font-bold text-[#550080]">
                            КЛУБИЙН УРИА
                          </h3>
                          <p className="text-xs text-gray-800">{motto}</p>
                        </div>
                      )}
                      {mission && (
                        <div>
                          <h3 className="text-sm font-bold text-[#550080]">
                            КЛУБИЙН ЗОРИЛГО
                          </h3>
                          <p className="text-xs text-gray-800">{mission}</p>
                        </div>
                      )}
                    </div>

                    {/* Preview Stats */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {athletesCount && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#550080]">
                            {athletesCount}
                          </div>
                          <div className="text-xs text-gray-700">Тамирчид</div>
                        </div>
                      )}
                      {typesCount && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#550080]">
                            {typesCount}
                          </div>
                          <div className="text-xs text-gray-700">Төрөл</div>
                        </div>
                      )}
                      {coachesCount && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#550080]">
                            {coachesCount}
                          </div>
                          <div className="text-xs text-gray-700">
                            Дасгалжуулагч
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tournament Section Preview */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold text-[#550080] mb-4 text-center">
                  {tournamentTitle || "КЛУБИЙН НЭРЭМЖИТ ТЭМЦЭЭНҮҮД"}
                </h2>
                <p className="text-gray-700 text-lg mb-6 text-center max-w-2xl">
                  {tournamentDescription ||
                    "Манай клубийн нэрэмжит оюуны спортын тэмцээнүүдийг жил бүр тогтмол зохион байгуулдаг..."}
                </p>

                {tournamentName && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="font-bold text-lg mb-2">
                      "{tournamentName}" тэмцээн
                    </div>
                    {tournamentFrequency && (
                      <div className="text-gray-600 mb-1">
                        Зохиогдох давтамж: {tournamentFrequency}
                      </div>
                    )}
                    {tournamentParticipants && (
                      <div className="text-gray-600 mb-1">
                        Оролцогчид: {tournamentParticipants}
                      </div>
                    )}
                    {tournamentDetails && (
                      <div className="text-gray-600 text-sm">
                        {tournamentDetails}
                      </div>
                    )}
                  </div>
                )}

                {tournamentButtonText && (
                  <div className="text-center">
                    <button className="bg-[#550080] text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                      {tournamentButtonText}
                    </button>
                  </div>
                )}
              </div>

              {/* Activities Section Preview */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                  {activitiesTitle || "КЛУБИЙН ҮЙЛ АЖИЛЛАГАА"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow p-4 text-center"
                    >
                      <div className="flex justify-center mb-4">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
                          <Image
                            src={activity.imageUrl}
                            alt={activity.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-[#550080] mb-2">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {activity.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Types Section Preview */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold text-[#550080] mb-8 text-center">
                  {typesTitle || "КЛУБИЙН ТӨРЛҮҮД"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {types.map((type, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center"
                    >
                      <div className="flex justify-center mb-4">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={type.imageUrl}
                            alt={type.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-[#550080] mb-2">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {type.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Membership Section Preview */}
              <div className="bg-gradient-to-r from-[#550080]/90 to-blue-500/80 rounded-xl shadow-lg p-8 flex flex-col items-center text-white border-2 border-[#550080]">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center drop-shadow">
                  {membershipTitle || "КЛУБИЙН ГИШҮҮН БОЛОХ ШААРДЛАГА"}
                </h2>
                <p className="text-lg mb-6 text-center max-w-2xl drop-shadow">
                  {membershipDescription ||
                    "Манай клубт элсэхийг хүссэн сурагчид дараах шаардлагыг хангасан байх ёстой. Бид идэвхтэй, оюунлаг, хамт олонч залуусыг урьж байна!"}
                </p>
                <ul className="space-y-3 w-full max-w-lg">
                  {membershipRequirements.map((requirement, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 bg-white/90 text-[#550080] rounded-lg px-4 py-3 font-semibold shadow"
                    >
                      <span className="text-2xl">✔️</span>
                      {requirement}
                    </li>
                  ))}
                </ul>
                {(registerButtonText || googleFormLink) && (
                  <a
                    href={googleFormLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block bg-white text-[#550080] px-6 py-2 rounded-lg font-bold shadow hover:bg-gray-100 transition-colors text-lg"
                  >
                    {registerButtonText || "Клубт элсэх"}
                  </a>
                )}
              </div>
            </div>

            {/* Awards Section Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* International Awards Preview */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#550080] mb-4 text-center md:text-left">
                  {internationalAwardsTitle || "ОЛОН УЛСЫН ШАГНАЛУУД"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {internationalAwards.map((award, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
                    >
                      <div className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <Image
                          src={award.imageUrl}
                          alt={award.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="font-semibold text-[#550080] text-center">
                        {award.title}
                      </div>
                      <div className="text-gray-600 text-sm text-center">
                        {award.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Domestic Awards Preview */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#550080] mb-4 text-center md:text-left">
                  {domesticAwardsTitle || "ДОТООДЫН ШАГНАЛУУД"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {domesticAwards.map((award, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
                    >
                      <div className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <Image
                          src={award.imageUrl}
                          alt={award.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="font-semibold text-[#550080] text-center">
                        {award.title}
                      </div>
                      <div className="text-gray-600 text-sm text-center">
                        {award.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
