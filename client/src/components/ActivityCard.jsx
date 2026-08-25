import { Clock, Tag, MapPin } from 'lucide-react';
import { formatINR } from '../utils/format';
import Rating from './Rating';

const ActivityCard = ({ activity, index = 0 }) => {
  return (
    <div className="card p-4 hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
            <MapPin size={20} className="text-primary-500" />
          </div>
          <div>
            <h4 className="font-semibold text-dark">{activity.name}</h4>
            <Rating value={activity.rating} size={14} showValue={true} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {activity.duration}
        </span>
        <span className="flex items-center gap-1">
          <Tag size={14} />
          {activity.category}
        </span>
        <span className="ml-auto font-semibold text-primary-500">
          {activity.cost === 0 ? 'Free' : formatINR(activity.cost)}
        </span>
      </div>
    </div>
  );
};

export default ActivityCard;