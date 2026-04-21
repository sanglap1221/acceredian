import { Users, Building2, TrendingUp } from "lucide-react";
import Container from "@/components/Container";

const stats = [
  {
    icon: <Users className="text-primary" size={32} />,
    value: "10K+",
    label: "Learners Empowered",
    description: "Professionals upskilled across diverse industries."
  },
  {
    icon: <Building2 className="text-primary" size={32} />,
    value: "200+",
    label: "Global Companies",
    description: "Trusted partners relying on our expertise."
  },
  {
    icon: <TrendingUp className="text-primary" size={32} />,
    value: "95%",
    label: "Success Rate",
    description: "Students achieving their career goals after completion."
  }
];

export default function Stats() {
  return (
    <section id="stats" className="py-24 bg-white">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">Proven Track Record</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our numbers speak for themselves. We have been consistently delivering excellence in professional education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl border border-gray-100 bg-gray-50 text-center hover:bg-white hover:shadow-2xl smooth-transition group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 smooth-transition">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-extrabold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-lg font-bold text-primary mb-4">{stat.label}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
