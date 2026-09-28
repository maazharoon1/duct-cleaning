export const services = [
  {
    slug: "air-duct-cleaning",
    title: "Air Duct Cleaning",
    description: "Remove dust, debris, and buildup from ductwork to support cleaner airflow throughout your home.",
    detail: "Our air duct service focuses on the hidden passages that move air from room to room. We inspect the accessible system, clean the selected ductwork, and review what we found.",
    image: "/images/duct-technician.jpg",
    alt: "Technician opening a ceiling air vent",
    points: ["Supply and return vents", "Accessible ductwork", "A clear final walkthrough"],
  },
  {
    slug: "dryer-vent-cleaning",
    title: "Dryer Vent Cleaning",
    description: "Clear lint and blockages from dryer vents to help improve efficiency and reduce potential fire risk.",
    detail: "Lint can collect beyond the lint trap and restrict the exhaust path. We inspect and clean the accessible vent run, then check the outlet and share any concerns.",
    image: "/images/dryer-vent.jpeg",
    alt: "Exterior dryer exhaust vent",
    points: ["Accessible vent run", "Exterior outlet", "Airflow review"],
  },
  {
    slug: "chimney-cleaning",
    title: "Chimney Cleaning",
    description: "Remove soot and buildup to help keep the chimney cleaner and operating more safely.",
    detail: "Routine chimney care addresses soot and other buildup inside the accessible flue. We look at the condition of the chimney, clean the selected area, and explain what we observe.",
    image: "/images/chimney-service.jpeg",
    alt: "Chimney technician beside a residential roof flue",
    points: ["Accessible flue cleaning", "Soot and buildup removal", "Condition review"],
  },
] as const;
