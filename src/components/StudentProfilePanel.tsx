import { useState } from 'react';
import type { ALevelGrade, ApplicationYear, GcseGrade } from '@/types';
import { GCSE_GRADES } from '@/types';
import { COMMON_A_LEVEL_SUBJECTS } from '@/data/taxonomy';
import { filledGrades, sortGradesDesc } from '@/lib/grades';
import { APPLICATION_YEARS } from '@/lib/filters';
import { useApp } from '@/state/AppContext';
import { GradeSelector } from './GradeSelector';
import { InfoTooltip } from './InfoTooltip';
import { IconCross } from './ui/icons';
import { Badge, Card, Segmented, cx } from './ui/primitives';

let nextId = 100;
const newId = () => `al-${(nextId += 1)}`;

export function StudentProfilePanel({ variant = 'panel' }: { variant?: 'panel' | 'inline' }) {
  const { profile, setProfile, resetProfile, setEntryYear } = useApp();
  const [showGcse, setShowGcse] = useState(profile.gcses.length > 0);

  const entries = filledGrades(profile);
  const profileString = sortGradesDesc(entries.map((e) => e.grade)).join('');

  const updateALevel = (id: string, patch: { subject?: string; grade?: ALevelGrade | null }) =>
    setProfile((prev) => ({
      ...prev,
      aLevels: prev.aLevels.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }));

  const removeALevel = (id: string) =>
    setProfile((prev) => ({ ...prev, aLevels: prev.aLevels.filter((a) => a.id !== id) }));

  const addALevel = () =>
    setProfile((prev) => ({
      ...prev,
      aLevels: [...prev.aLevels, { id: newId(), subject: '', grade: null }],
    }));

  return (
    <Card className={cx('p-4', variant === 'inline' && 'shadow-none')}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-navy-950">Your A-Levels</h2>
          <p className="mt-0.5 text-xs text-ink-muted">
            Optional. Entered grades stay in this browser and are used only to compare against
            published requirements.
          </p>
        </div>
        {entries.length > 0 ? (
          <Badge tone="navy" className="shrink-0 text-xs">
            {profileString}
          </Badge>
        ) : null}
      </div>

      <div className="space-y-2">
        {profile.aLevels.map((entry, index) => (
          <div key={entry.id} className="flex flex-wrap items-center gap-2">
            {/*
              A placeholder is not an accessible name: it disappears on input and
              screen readers are not required to announce it. Each row needs a
              name that distinguishes it from the others, so the subject index is
              part of it — three inputs all called "Subject" would be no more
              usable than three with no name at all. Added in v0.9 after the
              release accessibility pass found these three unnamed.
            */}
            <input
              list="a-level-subjects"
              className="field h-9 min-w-0 flex-1 basis-40 py-1.5"
              placeholder="Subject"
              aria-label={`A-Level subject ${index + 1}`}
              value={entry.subject}
              onChange={(e) => updateALevel(entry.id, { subject: e.target.value })}
            />
            <GradeSelector
              value={entry.grade}
              onChange={(grade) => updateALevel(entry.id, { grade })}
              label={`Predicted grade for ${entry.subject || 'this subject'}`}
            />
            <button
              type="button"
              onClick={() => removeALevel(entry.id)}
              className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600"
              aria-label={`Remove ${entry.subject || 'subject'}`}
            >
              <IconCross width={14} height={14} />
            </button>
          </div>
        ))}
      </div>

      <datalist id="a-level-subjects">
        {COMMON_A_LEVEL_SUBJECTS.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" className="btn-secondary h-8 px-2.5 text-xs" onClick={addALevel}>
          Add subject
        </button>
        <button
          type="button"
          className="btn-ghost h-8 px-2.5 text-xs"
          onClick={() => setShowGcse((s) => !s)}
        >
          {showGcse ? 'Hide GCSEs' : 'Add GCSEs (optional)'}
        </button>
        <button type="button" className="btn-ghost h-8 px-2.5 text-xs" onClick={resetProfile}>
          Clear
        </button>
      </div>

      {showGcse ? (
        <div className="mt-4 border-t border-slate-200 pt-3">
          <div className="label mb-2">GCSEs</div>
          <div className="space-y-2">
            {profile.gcses.map((g) => (
              <div key={g.id} className="flex items-center gap-2">
                <input
                  className="field h-9 min-w-0 flex-1 py-1.5"
                  placeholder="Subject"
                  value={g.subject}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      gcses: prev.gcses.map((x) =>
                        x.id === g.id ? { ...x, subject: e.target.value } : x,
                      ),
                    }))
                  }
                />
                <select
                  className="field h-9 w-20 py-1.5"
                  value={g.grade ?? ''}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      gcses: prev.gcses.map((x) =>
                        x.id === g.id
                          ? { ...x, grade: (e.target.value || null) as GcseGrade | null }
                          : x,
                      ),
                    }))
                  }
                >
                  <option value="">–</option>
                  {GCSE_GRADES.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    setProfile((prev) => ({
                      ...prev,
                      gcses: prev.gcses.filter((x) => x.id !== g.id),
                    }))
                  }
                  className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600"
                  aria-label="Remove GCSE"
                >
                  <IconCross width={14} height={14} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn-secondary mt-2 h-8 px-2.5 text-xs"
            onClick={() =>
              setProfile((prev) => ({
                ...prev,
                gcses: [...prev.gcses, { id: `gcse-${(nextId += 1)}`, subject: '', grade: null }],
              }))
            }
          >
            Add GCSE
          </button>
          <p className="mt-2 text-xs text-ink-muted">
            GCSEs are stored for your own reference. Course records only include GCSE requirements
            where a university specifically publishes them.
          </p>
        </div>
      ) : null}

      <div className="mt-4 border-t border-slate-200 pt-3">
        <span className="mb-1.5 block text-xs font-medium text-ink-faint">
          Does your school or college offer Further Mathematics?
        </span>
        <Segmented<'yes' | 'no' | 'unknown'>
          size="sm"
          value={
            profile.schoolOffersFurtherMathematics === true
              ? 'yes'
              : profile.schoolOffersFurtherMathematics === false
                ? 'no'
                : 'unknown'
          }
          onChange={(v) =>
            setProfile((prev) => ({
              ...prev,
              schoolOffersFurtherMathematics: v === 'yes' ? true : v === 'no' ? false : null,
            }))
          }
          options={[
            { id: 'unknown', label: 'Not said' },
            { id: 'yes', label: 'Yes' },
            { id: 'no', label: 'No' },
          ]}
        />
        <p className="mt-1 text-[11px] leading-relaxed text-ink-faint">
          Some universities require Further Mathematics only if your school offers it. Leaving this
          unanswered makes those courses report “review required” rather than a pass or a fail.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3">
        <span className="text-xs font-medium text-ink-faint">
          Entry year
          <InfoTooltip term="application-year" />
        </span>
        <Segmented<ApplicationYear>
          size="sm"
          value={profile.applicationYear}
          onChange={(year) => setEntryYear(year)}
          options={APPLICATION_YEARS.map((y) => ({ id: y, label: `${y} entry` }))}
        />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-muted">
        Matching compares your entered grades with published academic requirements only. Universities
        also consider personal statements, references, admissions tests and interviews, so meeting the
        published requirements is not a guarantee of an offer.
      </p>
    </Card>
  );
}
