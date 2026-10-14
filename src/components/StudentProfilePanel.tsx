import { useState } from 'react';
import type { ALevelGrade, GcseGrade } from '@/types';
import { GCSE_GRADES } from '@/types';
import { COMMON_A_LEVEL_SUBJECTS } from '@/data/taxonomy';
import { filledGrades, sortGradesDesc } from '@/lib/grades';
import { useApp } from '@/state/AppContext';
import { GradeSelector } from './GradeSelector';
import { InfoTooltip } from './InfoTooltip';
import { IconCross } from './ui/icons';
import { EntryYearSwitch } from './EntryYearSwitch';
import { Badge, Card, Segmented } from './ui/primitives';

let nextId = 100;
const newId = () => `al-${(nextId += 1)}`;

/**
 * The student's A-Level profile form. It lives in a drawer on the explorer, so it
 * opens when asked for and never takes space from the results. The profile
 * state, storage and validation are unchanged; this component only edits it.
 */
export function StudentProfileForm() {
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
    <div>
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="text-sm text-ink-muted">
          Optional. Entered grades stay in this browser and are used only to compare against
          published requirements.
        </p>
        {entries.length > 0 ? (
          <Badge tone="navy" className="shrink-0 tabular-nums">
            {profileString}
          </Badge>
        ) : null}
      </div>

      <div className="profile-grades">
        {profile.aLevels.map((entry, index) => (
          <div key={entry.id} className="profile-row">
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
              className="field min-w-0"
              placeholder="Subject"
              aria-label={`A-Level subject ${index + 1}`}
              value={entry.subject}
              onChange={(e) => updateALevel(entry.id, { subject: e.target.value })}
            />
            <button
              type="button"
              onClick={() => removeALevel(entry.id)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-ctl text-ink-faint hover:bg-sunken hover:text-rose-700"
              aria-label={`Remove ${entry.subject || 'subject'}`}
            >
              <IconCross width={16} height={16} />
            </button>
            <div className="profile-row-actions">
              <GradeSelector
                value={entry.grade}
                onChange={(grade) => updateALevel(entry.id, { grade })}
                label={`Predicted grade for ${entry.subject || 'this subject'}`}
              />
            </div>
          </div>
        ))}
      </div>

      <datalist id="a-level-subjects">
        {COMMON_A_LEVEL_SUBJECTS.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" className="btn-secondary btn-sm" onClick={addALevel}>
          Add subject
        </button>
        <button
          type="button"
          className="btn-ghost btn-sm"
          onClick={() => setShowGcse((s) => !s)}
        >
          {showGcse ? 'Hide GCSEs' : 'Add GCSEs (optional)'}
        </button>
        <button type="button" className="btn-ghost btn-sm" onClick={resetProfile}>
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
                  className="field min-w-0 flex-1"
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
                  className="field w-20"
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-ctl text-ink-faint hover:bg-sunken hover:text-rose-700"
                  aria-label="Remove GCSE"
                >
                  <IconCross width={16} height={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn-secondary btn-sm mt-2"
            onClick={() =>
              setProfile((prev) => ({
                ...prev,
                gcses: [...prev.gcses, { id: `gcse-${(nextId += 1)}`, subject: '', grade: null }],
              }))
            }
          >
            Add GCSE
          </button>
          <p className="mt-2 text-[13px] text-ink-muted">
            GCSEs are stored for your own reference. Course records only include GCSE requirements
            where a university specifically publishes them.
          </p>
        </div>
      ) : null}

      <div className="mt-4 border-t border-slate-200 pt-3">
        <span className="mb-1.5 block text-sm font-medium text-ink">
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
        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
          Some universities require Further Mathematics only if your school offers it. Leaving this
          unanswered makes those courses report “review required” rather than a pass or a fail.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-3">
        <span className="flex items-center gap-1 text-sm font-medium text-ink">
          Entry year
          <InfoTooltip term="application-year" />
        </span>
        <EntryYearSwitch
          idPrefix="profile-year"
          value={profile.applicationYear}
          onChange={(year) => setEntryYear(year)}
        />
      </div>

      <p className="profile-note mt-4">
        Matching compares your entered grades with published academic requirements only. Universities
        also consider personal statements, references, admissions tests and interviews, so meeting the
        published requirements is not a guarantee of an offer.
      </p>
    </div>
  );
}

/** The same form in a titled card, for pages where it sits in the layout (course, compare). */
export function StudentProfilePanel() {
  return (
    <Card className="p-4">
      <h2 className="mb-2 text-base font-semibold text-navy-950">Your A-Levels</h2>
      <StudentProfileForm />
    </Card>
  );
}
